const _ = require('lodash');
const sankeyNodes = require('./llnl-sankey-nodes');
const energy2014 = require('./us-energy-consumption-2014-sankey');
const energy2015 = require('./us-energy-consumption-2015-sankey');
const emissions2014 = require('./us-carbon-emissions-2014');

function parseSankeyDataset(sankeyData, nodeSankeyClassFilter) {
  let nodes = _.cloneDeep(sankeyNodes);

  if (nodeSankeyClassFilter === 'consumption') {
    // apply energy conversions
    sankeyData.links.forEach(l => {
      l.value = {
        quads: l.value,

        // conversions from https://en.wikipedia.org/wiki/Quad_(unit)
        TWh: l.value * 293.07,
        MTOE: l.value * 25.2, // Million Tonnes of Oil Equivalent
      };
    });
  } else if (nodeSankeyClassFilter === 'emissions') {
    sankeyData.links.forEach(l => {
      l.value = {
        MMT: l.value, // Million Metric Tons
      };
    });
  }


  let nodesById = {};
  nodes.forEach(n => nodesById[n.id] = n);


  // Validate links
  sankeyData.links.forEach(l => {
    // Prevent typos
    if (!nodesById[l.source]) {
      throw new Error(`Invalid link source '${l.source}' for link ${JSON.stringify(l, null, '  ')}`);
    }

    if (!nodesById[l.target]) {
      throw new Error(`Invalid link target '${l.target}' for link ${JSON.stringify(l, null, '  ')}`);
    }
  });


  // Apply styles to links
  sankeyData.links.forEach(l => {
    let styleLinkIn = nodesById[l.target].styleLinkIn;

    if (typeof styleLinkIn === 'function') {
      if (styleLinkIn(l)) {
        l.style = styleLinkIn(l);
      } // else, if function returns false, don't style
    } else if (styleLinkIn) {
      l.style = nodesById[l.target].id;
    }

    let styleLinkOut = nodesById[l.source].styleLinkOut;
    if (typeof styleLinkOut === 'function') {
      if (styleLinkOut(l)) {
        if (l.style) {
          // Fail-fast on double styles
          throw new Error(`Link getting double-styled by target and source: ${JSON.stringify(l, null, '  ')}`);
        }

        l.style = styleLinkOut(l);
      } // else, if function returns false, don't style
    } else if (styleLinkOut) {
      if (l.style) {
        // Fail-fast on double styles
        throw new Error(`Link getting double-styled by target and source: ${JSON.stringify(l, null, '  ')}`);
      }
      l.style = nodesById[l.source].id;
    }
  });

  // Cleanup nodes
  nodes.forEach(n => {
    delete n.styleLinkOut;
    delete n.styleLinkIn;
  });

  if (nodeSankeyClassFilter) {
    nodes = nodes.filter(n => n.whichSankey === undefined || n.whichSankey === nodeSankeyClassFilter);
  }

  sankeyData.nodes = nodes;


  // Change the source/target reference format of the links to fit d3-sankey
  let nodeIndeciesById = {};
  nodes.forEach((n, i) => nodeIndeciesById[n.id] = i);
  sankeyData.links.forEach(l => {
    l.sourceId = l.source;
    l.targetId = l.target;

    // Reference the index, not the node itself b/c sankifyFactory() produces getters that clone the nodes to
    // prevent interference across multiple usages of a common data.
    l.source = nodeIndeciesById[l.source];
    l.target = nodeIndeciesById[l.target];
  });

  return sankeyData;
}


let parsedData = {
  consumption2014: parseSankeyDataset(energy2014, 'consumption'),
  consumption2015: parseSankeyDataset(energy2015, 'consumption'),
  emissions2014: parseSankeyDataset(emissions2014, 'emissions'),
};

/**
 * Produces a getter that clones a dataset and prepares the links format for d3 sankey
 * @param dataset
 * @return {function(string)} Getter that transforms dataset into d3-sankey-ready
 */
function sankifyFactory(dataset) {
  return function sankify(whichEnergyUnits) {
    return {
      nodes: _.cloneDeep(dataset.nodes),
      links: dataset.links.map(l => {
        let newLink = _.clone(l);
        newLink.value = newLink.value[whichEnergyUnits];
        return newLink;
      }),
    };
  };
}

module.exports = {
  // Use these getters to get appropriate sankified consumption data.
  // Data returned is cloned so a visualization can augment it as needed
  // (ie getConsumption2014('TWh') !== getConsumption2014('TWh'))

  // Consumption getters takes one param -- the energy unit.  Can be one of: "quads", "TWh", "MTOE"
  getConsumption2014: sankifyFactory(parsedData.consumption2014),
  getConsumption2015: sankifyFactory(parsedData.consumption2015),

  // Consumption takes one param -- the CO2 unit.  Can be one of: "MMT" (Million Metric Tons)
  getEmissions2014: sankifyFactory(parsedData.emissions2014),


  // Raw data is available, but you should use the parser ones
  _consumption2014: parsedData.consumption2014,
  _consumption2015: parsedData.consumption2015,
  _emissions2014: parsedData.emissions2014,
};
