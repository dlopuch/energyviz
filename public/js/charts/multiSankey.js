const d3 = require('d3');

const MultiSankeyLayout = require('./llnlEnergySankey').LlnlMultiSankeyLayout;

require('../style/energySankey.less');

module.exports = function() {
  let margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  let svg = d3.select('#multi_sankey').append('svg')
    .classed('sankey', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  let formatNumber = d3.format(',.0f');
  let format = function (d) {
    return `${formatNumber(d)} TWh`;
  };

  let multiSankeyLayout = new MultiSankeyLayout({
    width,
    height,
    nodePadding: 5,
    nodeWidth: 10,
  });

  let layoutData = multiSankeyLayout.calculateLayout();

  window.msLayout = multiSankeyLayout;
  window.msLayoutData = layoutData;

  layoutData = {
    links: layoutData.energyLayout.links.concat(layoutData.emissionsLayout.analysisLinks),
    nodes: layoutData.energyLayout.nodes.concat(layoutData.emissionsLayout.analysisNodes),
  };

  let linkPathGenerator = MultiSankeyLayout.makeLinkPathGenerator();

  let links = svg.append('g').classed('sankey-links', true).selectAll('.link')
    .data(layoutData.links)
    .enter().append('path')
      .attr('class', d => `link ${d.data.style || ''}`);

  links.append('title')
    .text(d => `${d.source.data.name} → ${d.target.data.name}\n${format(d.values.energy)}`);

  let nodes = svg.append('g').classed('sankey-nodes', true).selectAll('.node')
    .data(layoutData.nodes)
    .enter().append('g')
      .attr('class', d => `node ${d.id || ''}`);

  let nodeRects = nodes.append('rect');
    // .style('fill', d => d.color = 'black') // color(d.name.replace(/ .*/, ''));
    // .style('stroke', d => d3.rgb(d.color).darker(2))

  nodeRects
    .append('title')
    .text(d => `${d.data.name}\n${format(d.values.energy)}`);

  let nodeLabels = nodes.append('text')
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(d => d.data.name);

  nodeLabels
    .filter(d => d.x < width / 2)
    .attr('text-anchor', 'start');


  function _updateLayout(animate) {
    if (animate) {
      links.transition()
        .attr('d', linkPathGenerator)
        // stroke-width isn't recognized as a transition'able style.  Which is wrong.
        // So we make our own interpolator for the transition.
        .styleTween('stroke-width', function(l) {
          return d3.interpolateNumber(parseFloat(d3.select(this).style('stroke-width')) || 0, Math.max(2, l.dy));
        })
        .style('opacity', 1);
    } else {
      links
        .attr('d', linkPathGenerator)
        .style('stroke-width', d => Math.max(2, d.dy))
        .style('opacity', 1);
    }

    (animate ? nodes.transition() : nodes)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('opacity', 1);

    (animate ? nodeRects.transition() : nodeRects)
      .attr('height', d => d.dy)
      .attr('width', d => d.dx);

    (animate ? nodeLabels.transition() : nodeLabels)
      .attr('x', -6)
      .attr('y', d => d.dy / 2)
      .filter(d => d.x < width / 2)
      .attr('x', d => 6 + d.dx);
  }

  function updateLayout(animate) {
    let newData = multiSankeyLayout.calculateLayout();
    // no need to d3 datajoin, it updates the data objects in place.  Just run layout against new numbers.
    _updateLayout(animate);
    return newData;
  }

  _updateLayout(false); // skip recalculate layout on first update -- already did it


  /*
   * Showing and Hiding Nodes
   * ------------
   * Hiding the sink nodes (or any nodes) is a bit tricky, non-standard slide-things-off-stage d3'ing.
   * The trick is the link path generator draws the link relative to the link's source and target data objects.
   * Thus, we can move the sankey nodes off screen using standard d3, but if the underlying data objects remain
   * unchanged, the link paths will stay static.
   * Solution is to define a manual d3 tween that has the side-effect that it *changes the underlying sankey node
   * data object*.  Unlike normal d3 animations, we're changing the data object on each animation frame and then
   * drawing the position of both the node and the link off the changed data object.
   */
  let energySinkNodeFilter = n => n.data.category === 'analysis' && n.data.whichSankey === 'consumption';
  function hideNodesAndLinks(nodeFilter, linkFilter) {
    let offscreenY = height + margin.top + margin.bottom;
    nodes.filter(nodeFilter).transition()
      .tween('hideNodesAndLinks', function(n) {
        let nodeEl = this;
        let newYInterpolator = d3.interpolateNumber(n.y, offscreenY + n.y);
        n._origY = n.y;
        return t => {
          // Need to change the data so the relative-position link path generator can draw link to follow this
          n.y = newYInterpolator(t);

          // and move it down while we're already interpolating it
          nodeEl.setAttribute('transform', `translate(${n.x},${n.y})`);
        };
      })
      .style('opacity', 0);

    links.filter(linkFilter ? l => linkFilter(l) : l => nodeFilter(l.target)).transition()
      .attrTween('d', function(l) {
        return t => linkPathGenerator(l); // eslint-disable-line no-unused-vars
      })
      .style('opacity', 0);
  }
  function showNodesAndLinks(nodeFilter, linkFilter) {
    nodes.filter(nodeFilter).transition()
      .tween('showSinks', function(n) {
        let nodeEl = this;
        let newYInterpolator = d3.interpolateNumber(n.y, n._origY);
        return t => {
          // Need to change the data so the relative-position link path generator can draw link to follow this
          n.y = newYInterpolator(t);

          // and move it up while we're already interpolating it
          nodeEl.setAttribute('transform', `translate(${n.x},${n.y})`);
        };
      })
      .style('opacity', 1);

    links.filter(linkFilter ? l => linkFilter(l) : l => nodeFilter(l.target)).transition()
      .attrTween('d', function(l) {
        return t => linkPathGenerator(l); // eslint-disable-line no-unused-vars
      })
      .style('opacity', 1);
  }


  window.updateLayout = updateLayout;
  let is2014 = true;
  window.toggleYearAndUpdate = function toggleYear() {
    multiSankeyLayout.dataAndControls.setEnergyAccessor(
      is2014 ?
        multiSankeyLayout.dataAndControls.accessors.energy2015 :
        multiSankeyLayout.dataAndControls.accessors.energy2014
    );
    console.log(`Now showing ${is2014 ? '2015' : '2014'} data`);
    updateLayout(true);
    is2014 = !is2014;
  };
  window.hideSinks = () => hideNodesAndLinks(energySinkNodeFilter);
  window.showSinks = () => showNodesAndLinks(energySinkNodeFilter);
  console.log('Yo! try hitting toggleYearAndUpdate(), hideSinks(), or showSinks() to see examples of transitions!');
};
