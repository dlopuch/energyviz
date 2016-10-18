/**
 * The SankeyEmissionInterpolator uses the 2014 LLNL Emission and Consumption flowchart to calculate
 * a "CO2 Emission per Energy" efficiency for each link in the LLNL flowchart.  If we scale production of various
 * sources according to some projections, this model will assume 2014 efficiency and predict corresponding CO2 output.
 *
 * Clearly the main problem with this model is 2014 efficiencies probably will get better in 2030.  eg if CCS becomes a
 * thing, efficiency of coal will become far better than predicted by this interpolator.
 */

const _ = require('lodash');
const d3 = require('d3');
const energyDatasets = require('../data/us-energy-consumption-emissions-parser');
const llnlSankeyNodes = require('../data/llnl-sankey-nodes');

let nodesById = _.keyBy(llnlSankeyNodes, 'id');

/**
 * We can only interpolate for links coming from an energy source node.  Emissions from other nodes are aggregates of
 * all the inputs, so they need to be calculated using a linked model.
 */
let sourceLinksOnlyFilter = l => nodesById[l.sourceId].category === 'source';

let energy2014Links = energyDatasets._consumption2014.links.filter(sourceLinksOnlyFilter).map(_.clone);
let emissions2014Links = energyDatasets._emissions2014.links.filter(sourceLinksOnlyFilter).map(_.clone);

let linkHasher = l => `${_.get(l, 'source.id') || l.sourceId}__${_.get(l, 'target.id') || l.targetId}`;
let energy2014LinksById = _.keyBy(energy2014Links, linkHasher);
let emissions2014LinksById = _.keyBy(emissions2014Links, linkHasher);

/**
 * Creates a linear interpolation of an energy source link's emissions given its energy.
 * Linear interpolation is defined using 2014 LLNL energy flowchart emissions and energy production by source, ie
 *   interpolated emissions = (2014-emissions / 2014-energy) * source-energy
 *
 * eg in 2014, natural gas produced 8.37 quads of energy in electricity while producing 444 Million Metric Tons CO2
 * in that electricity production.  This linear interpolator will interpolate the MMT CO2 for a natural gas-->electricity
 * link given a function to get the energy produced by that link.
 *
 * @param {LlnlSankeyLink} energySourceLink The linked-up (ie went through the engine) sankey link.  Must be of
 *   category 'source' -- ie a primary producer of energy.
 * @param {function(LlnlSankeyLink)} getSourceLinkEnergy() Function to pick out energy from a link
 * @param {string} [energyUnits] Units of energy produced by getSourceLinkEnergy().  Defaults TWh.
 * @param {string} [emissionsUnits] Units of emissions to spit out.  Defaults to MMT.
 * @return {number} Interpolated emissions.
 */
function interpolateEmissions(
  energySourceLink, getSourceLinkEnergy, energyUnits = 'TWh', emissionsUnits = 'MMT'
) {
  let energy2014Link = energy2014LinksById[linkHasher(energySourceLink)];
  if (!energy2014Link) {
    throw new Error('Energy source link has unrecognized 2014 energy data');
  }

  let emissions2014Link = emissions2014LinksById[linkHasher(energySourceLink)];
  if (!emissions2014Link) {
    throw new Error('Energy source link has unrecognized 2014 emissions data');
  }

  // interpolated emissions = (2014-emissions / 2014-energy) * source-energy
  // eg TWh * (CO2/TWh)
  return (emissions2014Link.value[emissionsUnits] / energy2014Link.value[energyUnits]) * getSourceLinkEnergy(energySourceLink);
}


/**
 * Creates a linear interpolation of any sankey link's emissions given a link-to-energy function.
 *
 * Linear interpolation is defined using 2014 LLNL energy flowchart emissions and energy production by source, ie
 *   interpolated emissions = (2014-emissions / 2014-energy) * source-energy
 *
 * See interpolateEmissions() for details on interpolation for links from primary energy sources.
 *
 * For links from non-primary-energy-sources, the interpolation is the sum of the interpolation for all the source
 * node's primary energy sources.
 *
 * @param {LlnlSankeyLink} link The linked-up (ie went through the engine) sankey link.  Must be of
 *   category 'source' -- ie a primary producer of energy.
 * @param {function(LlnlSankeyLink)} getLinkEnergy() Function to pick out energy from a link
 * @param {string} [energyUnits] Units of energy produced by getSourceLinkEnergy().  Defaults TWh.
 * @param {string} [emissionsUnits] Units of emissions to spit out.  Defaults to MMT.
 * @return {number} Interpolated emissions.
 */
module.exports = function interpolateAnyLinkEmissions(
  link, getLinkEnergy, energyUnits = 'TWh', emissionsUnits = 'MMT'
) {
  if (link.source.data.category === 'source') {
    return interpolateEmissions(link, getLinkEnergy, energyUnits, emissionsUnits);
  }

  if (link.source.data.category === 'consumer' && link.target.data.category === 'consumer') {
    return 0; // electricity --> any of the other consumers
  }

  // Else, it's an aggregate link.  Add up all the source node's incoming energySource links.
  return d3.sum(
    link.source.inboundLinks.filter(l => l.source.data.category === 'source'),
    primaryEnergyLink => interpolateEmissions(primaryEnergyLink, getLinkEnergy, energyUnits, emissionsUnits)
  );
};
