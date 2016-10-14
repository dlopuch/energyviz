
const _ = require('lodash');
const d3 = require('d3');

const getNodesAndLinks = require('./llnlSankeyNodes');
const sankeyCore = require('./sankeyCore');

module.exports = class LlnlMultiSankeyLayout {
  constructor(opts) {
    // Parse all the data and transform it all into appropriate nodes, links, and controls
    this.dataAndControls = getNodesAndLinks();

    this._engine = new sankeyCore.SankeyEngine()
      .nodes(this.dataAndControls.nodes)
      .links(this.dataAndControls.links)
      .init();

    this.opts = _.defaults(opts, {
      width: 960,
      height: 500,
      nodePadding: 30,
      nodeWidth: 10,
    });

    this._energyNodeScaleFactor = Infinity;
  }

  static makeLinkPathGenerator() {
    // from d3-sankey
    let curvature = 0.5;

    function link(d) {
      let x0 = d.source.x + d.source.dx;
      let y0 = d.source.y + d.sy;

      let x1 = d.target.x;
      let y1 = d.target.y + d.ty;

      let xi = d3.interpolateNumber(x0, x1);
      let x2 = xi(curvature);
      let x3 = xi(1 - curvature);
      return `
        M${x0},${y0}
        C${x2},${y0}
         ${x3},${y1}
         ${x1},${y1}
      `;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature; // eslint-disable-line prefer-rest-params
      curvature = +_;
      return link;
    };

    return link;
  }

  calculateLayout() {
    return {
      energyLayout: this._calculateEnergyLayout(),
      emissionsLayout: this._calculateEmissionsLayout(),
    };
  }

  _calculateEnergyLayout() {
    // This is where we diverge from a generic Sankey layout engine and just make something specific for the LLNL flow

    let ENERGY_VALUE_KEY = 'energy';
    let energyNodesFilter = n => n.data.whichSankey !== 'emissions';
    let energyLinksFilter = l => energyNodesFilter(l.source) && energyNodesFilter(l.target);

    let energyData = this._engine.getLayoutData(
      ENERGY_VALUE_KEY,
      l => l.getLinkEnergy(),
      energyNodesFilter // filter down to only energy nodes
    );

    // Conversion factor from energy value to pixel (px/TWh). d3-sankey calls this ky.
    this._energyNodeScaleFactor = Math.min(
      this._energyNodeScaleFactor,
      _(energyData.cols)
        .map(col => (this.opts.height - this.opts.nodePadding * (col.nodes.length - 1)) / col.colValueSum)
        .min()
    );

    // Figure out thickness of each link
    energyData.links.forEach(l => {
      l.dy = l.values[ENERGY_VALUE_KEY] * this._energyNodeScaleFactor;
    });

      // Calculate the y's and dy's of all the nodes per column
    let colDx = (this.opts.width - this.opts.nodeWidth) / (energyData.cols.length - 1);
    energyData.cols.forEach((col, colI) => {
      let curY;
      if (colI === 0 || colI === 1 || colI === 3) {
        // Sources, electricity, and sinks start at top
        curY = 0;
      } else if (colI === 2) {
        // Sinks start on bottom
        curY = this.opts.height -
          (col.colValueSum * this._energyNodeScaleFactor + this.opts.nodePadding * (col.nodes.length - 1));
      } else {
        throw new Error('Unexpected column!');
      }

      col.nodes.forEach(node => {
        node.x = colI * colDx;
        node.dx = this.opts.nodeWidth;
        node.y = curY;
        node.dy = node.values[ENERGY_VALUE_KEY] * this._energyNodeScaleFactor;
        curY += node.dy + this.opts.nodePadding;


        // Now calculate positions of incoming and outbound links
        let ty = 0;
        node.inboundLinks.filter(energyLinksFilter).forEach(l => {
          l.ty = ty + l.dy / 2;
          ty += l.dy;
        });
        let sy = 0;
        node.outboundLinks.filter(energyLinksFilter).forEach(l => {
          l.sy = sy + l.dy / 2;
          sy += l.dy;
        });
      });
    });

    return {
      nodes: _(energyData.cols).map(col => col.nodes).flatten().value(),
      links: energyData.links,
    };
  }

  _calculateEmissionsLayout() {
    let EMISSIONS_VALUE_KEY = 'emissions';
    let emissionsNodesFilter = n => n.data.whichSankey !== 'consumption';
    let emissionsLinksFilter = l => emissionsNodesFilter(l.source) && emissionsNodesFilter(l.target);
    let emissionsAnalysisLinksFilter = l => emissionsNodesFilter(l.target) && l.target.data.category === 'analysis';

    let emissionsData = this._engine.getLayoutData(
      EMISSIONS_VALUE_KEY,
      l => l.getLinkEmissions(),
      emissionsNodesFilter // filter down to only energy nodes
    );
    let emissionsDataNodes = _(emissionsData.cols).map(col => col.nodes).flatten().value();

    // Conversion factor from emissions value to pixel (px/(MMT CO2)). d3-sankey calls this ky.
    // This one is a bit tricky -- and what makes this a avant garde multi-dimension sankey.
    // We're going to rely on the energy domain to scale all of the nodes.  Emissions are going to be a
    // secondary unit domain forced by the energy scalings.  Since we're only displaying emissions after
    // all the consumption nodes, we're going to see what's the maximum px/MMT each consumption node allows,
    // where we assume the node's px is set from the energy calculations.
    let consumerNodes = emissionsDataNodes.filter(n => n.data.category === 'consumer'); // elec, res, com, ind, trans
    this._emissionsScaleFactor = _(consumerNodes)
      .map(n => n.dy / n.values[EMISSIONS_VALUE_KEY])
      .min();

    // Figure out thickness of only the analysis links (others won't be shown, and their thickness is from energy)
    let analysisLinks = emissionsData.links.filter(emissionsAnalysisLinksFilter);
    analysisLinks.forEach(l => {
      l.dy = l.values[EMISSIONS_VALUE_KEY] * this._emissionsScaleFactor;
    });

    // We're only positioning and sizing the emissions sink node -- others are positioned and sized by energy
    let colDx = (this.opts.width - this.opts.nodeWidth) / (emissionsData.cols.length - 1);
    let analysisNodes = emissionsDataNodes.filter(n => n.data.category === 'analysis');
    analysisNodes.forEach(node => {
      node.x = 3 * colDx;
      node.dx = this.opts.nodeWidth;
      node.y = 0;
      node.dy = node.values[EMISSIONS_VALUE_KEY] * this._emissionsScaleFactor;

      // Now scale all of it's incoming links
      let ty = 0;
      node.inboundLinks.filter(emissionsLinksFilter).forEach(l => {
        l.sy = l.dy / 2;
        l.ty = ty + l.dy / 2;
        ty += l.dy;
      });
    });

    return {
      nodes: emissionsDataNodes,
      links: emissionsData.links,

      // For emissions, we generally only want to display the analysis (rightmost sink column) nodes
      analysisNodes,
      analysisLinks,
    };
  }
};
