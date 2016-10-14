const d3 = require('d3');

class SankeyNode {
  constructor(data) {
    /** links with this node as a source. */
    this.outboundLinks = [];

    /** links with this node as a target. */
    this.inboundLinks = [];

    this.data = data;

    this.xOrder = 0;
    this.yOrder = data.yOrder !== undefined ? data.yOrder : 0;

    // Values shall be keyed by their value type
    this.values = {};
  }

  acceptOutboundLink(outboundLink) {
    this.outboundLinks.push(outboundLink);
  }
  acceptInboundLink(inboundLink) {
    this.inboundLinks.push(inboundLink);
  }

  /**
   * Sort the links of a node based on source/targets absolute yPosition to minimize cross-overs
   */
  sortLinks() {
    this.outboundLinks.sort((a, b) => {
      let aY = a.target.yOrder;
      let bY = b.target.yOrder;
      return aY === bY ? 0 : aY - bY;
    });

    this.inboundLinks.sort((a, b) => {
      let aY = a.source.yOrder;
      let bY = b.source.yOrder;
      return aY === bY ? 0 : aY - bY;
    });
  }
}

class SankeyLink {
  constructor(data) {
    this.data = data;
    this.source = data.source;
    this.target = data.target;

    // Values shall be keyed by their value type
    this.values = {};
  }

  set source(sourceNode) {
    if (!(sourceNode instanceof SankeyNode)) throw new Error('source must be a SankeyNode instance');
    sourceNode.acceptOutboundLink(this);
    this._source = sourceNode;
  }
  get source() { return this._source; }

  set target(targetNode) {
    if (!(targetNode instanceof SankeyNode)) throw new Error('target must be a SankeyNode instance');
    targetNode.acceptInboundLink(this);
    this._target = targetNode;
  }
  get target() { return this._target; }
}

class SankeyEngine {
  constructor() {
    this._nodes = [];
    this._links = [];
    this._nodesByXOrder = [];
  }

  nodes(nodes) {
    if (!nodes) return this._nodes;
    this._nodes = nodes;
    return this;
  }

  links(links) {
    if (!links) return this._links;
    this._links = links;
    return this;
  }

  /**
   * Link up columns and prepare for data calculations.  Call only once after nodes and links set.
   * @return {SankeyEngine}
   */
  init() {
    this._computeNodeColumns();
    this._orderNodeLinks();
    return this;
  }

  /**
   * For a particular value accessor function, calculates values of links and nodes, mutates links and nodes to have
   * that latest value, and sums up the total value of the nodes in all the sankey columns.
   *
   * @param {string} valueKey Namespace key for the value accessor
   * @param {function(node)} linkValueAccessor Function that returns the value-of-interest of a given link
   * @param {function(node)} [nodeFilter] Optional filter to filter nodes
   * @return {Object} Links and node columns with column stats
   */
  getLayoutData(valueKey, linkValueAccessor, nodeFilter) {
    let links = this._links.filter(l => nodeFilter(l.source) && nodeFilter(l.target));
    links.forEach(l => l.values[valueKey] = linkValueAccessor(l));

    return {
      links,
      cols: this._nodesByXOrder.map(colData => {
        let nodes = nodeFilter ? colData.values.filter(nodeFilter) : colData.values;

        nodes.forEach(n => n.values[valueKey] = d3.max([
          d3.sum(n.inboundLinks, l => l.values[valueKey]),
          d3.sum(n.outboundLinks, l => l.values[valueKey]),
        ]));
        return {
          col: colData.key,
          nodes,
          colValueSum: d3.sum(nodes, n => n.values[valueKey]),
        };
      }),
    };
  }


  /**
   * @private
   * This sankey implementation does not calculate node y-positions.  Assuming that's set manually on the nodes.
   * However, nodes need to have their links ordered top-to-bottom by yOrder of the connecting links.
   * We assume that yOrder is set in absolute terms, not col-dependent.
   */
  _orderNodeLinks() {
    this._nodes.forEach(n => n.sortLinks());
  }


  /**
   * @private
   * Figures out the column of each node, where the column is defined as 1 + the column of it's largest-column'd
   * previous node.
   */
  _computeNodeColumns() {
    let remainingNodes = this._nodes;
    let x = 0;

    // Algorithm is from d3-sankey.
    // Start with all nodes, assign them current column.  Increment column count, then repeat with
    // nodes that are outbound-linked from all the ones we just tackled.  The column of a node is the last time
    // that it is linked from someone else.
    while (remainingNodes.length) {
      let nextNodes = [];
      remainingNodes.forEach(n => { // eslint-disable-line no-loop-func
        n.xOrder = x;
        n.outboundLinks.forEach(l => {
          if (nextNodes.indexOf(l.target) < 0) {
            nextNodes.push(l.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    // d3-sankey has a moveSinksRight(x) function which takes all sink-node (no outbound links) and puts them
    // on the right instead of where they land.  eg if there are 5 columns, a sink isn't allowed to be in col 2.
    // Arbitrary decision, not gonna do that here.

    this._nodesByXOrder = d3.nest()
      .key(node => node.xOrder)
      .sortKeys(d3.ascending)
      .entries(this._nodes);
  }
}

module.exports = {
  SankeyNode,
  SankeyLink,
  SankeyEngine,
};
