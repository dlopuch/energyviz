/**
 * The SankeyEmissionInterpolator uses the 2014 LLNL Emission and Consumption flowchart to calculate
 * a "CO2 Emission per Energy" efficiency for each link in the LLNL flowchart.  If we scale production of various
 * sources according to some projections, this model will assume 2014 efficiency and predict corresponding CO2 output.
 *
 * Clearly the main problem with this model is 2014 efficiencies probably will get better in 2030.  eg if CCS becomes a
 * thing, efficiency of coal will become far better than predicted by this interpolator.
 */

const energyDatasets = require('../data/us-energy-consumption-emissions-parser');

const consumption2014 = energyDatasets.getConsumption2014('TWh');
const emissions2014 = energyDatasets.getEmissions2014('MMT');


const sourceTargetTree = {};
function indexLinks(links, leafNameSpace, objToIndexCreator) {
  links.forEach(l => {
    if (!sourceTargetTree[l.sourceId]) {
      sourceTargetTree[l.sourceId] = {};
    }

    if (!sourceTargetTree[l.sourceId][l.targetId]) {
      sourceTargetTree[l.sourceId][l.targetId] = {};
    }

    sourceTargetTree[l.sourceId][l.targetId][leafNameSpace] = !objToIndexCreator ?
      l :
      objToIndexCreator(l, sourceTargetTree[l.sourceId][l.targetId]);
  });
}

indexLinks(consumption2014.links, 'consumption');
indexLinks(emissions2014.links, 'emissions');

// Now do the same traversal but establish CO2/unit energy ratios for all emission-defined links.
indexLinks(emissions2014.links, 'ratio', (emissionLink, leaves) => {
  if (leaves.consumption === undefined || leaves.emissions === undefined) {
    return NaN;
  }
  return leaves.emissions.value / leaves.consumption.value;
});

/**
 * Given a proposed energy link (in TWh), interpolates expected CO2 emissions based on 2014 efficiencies
 * @param {object} energyLinkTWh Must have a .sourceId string, a .targetId string, and a .value number in TWh
 * @return {number} Predicted emissions of CO2 in MMT (Million Metric Tons)
 */
module.exports = function interpolateEmissions(energyLinkTWh) {
  if (!sourceTargetTree[energyLinkTWh.sourceId]) {
    throw new Error(`Cannot interpolate energyLink -- source node not recognized. ${JSON.stringify(energyLinkTWh)}`);
  }
  if (!sourceTargetTree[energyLinkTWh.sourceId][energyLinkTWh.targetId]) {
    throw new Error(`Cannot interpolate energyLink -- target node not recognized. ${JSON.stringify(energyLinkTWh)}`);
  }

  // interpolate as: TWh * (CO2/TWh)
  return energyLinkTWh.value * sourceTargetTree[energyLinkTWh.sourceId][energyLinkTWh.targetId].ratio;
};
