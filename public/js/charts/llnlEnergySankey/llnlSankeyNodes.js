const _ = require('lodash');

const core = require('./sankeyCore');
const energyNodes = require('../../data/llnl-sankey-nodes');
const datasets = require('../../data/us-energy-consumption-emissions-parser');

const ACCESSORS = {
  emissions2014: link => _.get(link, 'data.emissions2014.value.MMT') || 0,
  energy2014: link => _.get(link, 'data.energy2014.value.TWh') || 0,
  energy2015: link => _.get(link, 'data.energy2015.value.TWh') || 0,
};

class LlnlSankeyNode extends core.SankeyNode {
  /**
   * @param {object} data Underlying node data
   */
  constructor(data) {
    super(data);
    this.id = data.id;
  }
}

class LlnlSankeyLink extends core.SankeyLink {
  /**
   * @param {object} data Underlying node data
   */
  constructor(data) {
    super(data);
    this.id = data.id;
  }
}


module.exports = function getNodeSet() {
  let energy2014 = _.cloneDeep(datasets._consumption2014);
  let energy2015 = _.cloneDeep(datasets._consumption2015);
  let emissions2014 = _.cloneDeep(datasets._emissions2014);


  // Nodes are easy -- just turn the existing nodes into LlnlSankeyNode's
  let nodes = energyNodes.map(n => new LlnlSankeyNode(n));
  let nodesById = _.keyBy(nodes, 'data.id');


  // Links are harder.  Need to group all the links appropriately.
  let linkHasher = l => `${l.sourceId}__${l.targetId}`;
  let energy2014LinksById = _.keyBy(energy2014.links, linkHasher);
  let energy2015LinksById = _.keyBy(energy2015.links, linkHasher);
  let emissions2014LinksById = _.keyBy(emissions2014.links, linkHasher);
  let uniqueIds = _([
    _.keys(energy2014LinksById),
    _.keys(energy2015LinksById),
    _.keys(emissions2014LinksById),
  ]).flatten().uniq().value();

  let links = uniqueIds.map(id => {
    let energy2014 = energy2014LinksById[id];
    let energy2015 = energy2015LinksById[id];
    let emissions2014 = emissions2014LinksById[id];

    let sourceId = _.get(energy2014, 'sourceId') || _.get(emissions2014, 'sourceId');
    let targetId = _.get(energy2014, 'targetId') || _.get(emissions2014, 'targetId');

    let style = _.get(energy2014, 'style') || _.get(emissions2014, 'style');
    return new LlnlSankeyLink(
      {
        id,

        // Some sources/targets are specific only to energy or emissions space.  Try both.
        sourceId,
        targetId,
        source: nodesById[sourceId],
        target: nodesById[targetId],

        style,

        emissions2014,
        energy2014,
        energy2015,
      }
    );
  });

  return {
    nodes,
    links,

    accessors: _.clone(ACCESSORS),
  };
};
