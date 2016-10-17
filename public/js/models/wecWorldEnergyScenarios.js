/*
 * Energy interpolations from the World Energy Council's 2016 World Energy Scenarios report
 * http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Summary-Report-1.pdf
 */

const _ = require('lodash');

/**
 * Defines the predicted growth rates out to 2060 for electricity contributions by source
 * Page 15 of http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Summary-Report-1.pdf
 */
const ELECTRICITY_TWH_BY_SOURCE_AND_MODEL = {
  // The report lists three scenarios -- 'Modern Jazz', 'Unfinished Symphony', and 'Hard Rock'.  Here is the growth
  // for each, respectively, plus the 2014 global numbers.
  // ie [0]: 2014, [1]: 2060 Modern Jazz, [2]: 2060 Unfinished Symphony, [3]: 2060 Hard Rock
  // Units: '000 TWh
  solar: [0.2, 5.7, 7.9, 3.3],
  coal: [9.6, 3.3 + 0.7, 1.1 + 1.0, 8.2], // Additions are adding CCS
  petroleum: [1.0, 0.3, 0.1, 0.4],
  biomass: [0.6, 3.5 + 0.2, 3.9 + 0.2, 2.4],
  wind: [0.7, 8.8, 9.3, 5.6],
  naturalGas: [5.2, 15.5 + 4.9, 7.5 + 6.7, 11.8],
  nuclear: [2.5, 4.9, 7.6, 6.7],
  hydro: [3.9, 6.6, 7.1, 6.5],

  // WEC summary report doesn't list geothermal in above reference.  Need to dive into full report.
  // We don't have exact unit predictions for these, just growth magnitudes.
  // Section 2.2.5.3.4.4: "Geothermal generation grows 8 times in the period" (Modern Jazz / electricity)
  // S 2.3.5.3.5.3: "Geothermal energy grows 14 times in the period to 2060, achieving a 2.5% share of electricity generation""
  // S 2.4.5.5.4.4: "Geothermal energy grows 5 times in the period to 2060, attaining a 0.9% share of electricity generation in 2060."
  geothermal: [1, 8, 14, 5],
};

const ELECTRICITY_SOURCE_2060_GROWTHS = _.mapValues(ELECTRICITY_TWH_BY_SOURCE_AND_MODEL, modelsTwh => ({
  modernJazz        : modelsTwh[1] / modelsTwh[0],
  unfinishedSymphony: modelsTwh[2] / modelsTwh[0],
  hardRock          : modelsTwh[3] / modelsTwh[0],
}));

/**
 * Interpolates energy usage in 2016 to electricity sources according to WEC scenarios report.
 * @param {object} link
 * @param {'modernJazz' | 'unfinishedSymphony' | 'hardRock'} wecScenarioKey Defaults to 'hardRock'
 */
module.exports = function interpolateEnergyIn2060(link, wecScenarioKey = 'hardRock') {
  if (link.target.id !== 'electricity') {
    return link.data.energy2014.value.TWh;
  }

  let growthDefn = ELECTRICITY_SOURCE_2060_GROWTHS[link.source.id];

  if (!growthDefn) {
    throw new Error(`[model:wecWorldEnergyScenarios] Unable to find 2060 WEC prediction for source '${link.source.id}'`);
  }

  return link.data.energy2014.value.TWh * growthDefn[wecScenarioKey];
};
