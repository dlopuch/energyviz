/*
 * Energy interpolations from the World Energy Council's 2016 World Energy Scenarios report
 * http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Summary-Report-1.pdf
 */

const _ = require('lodash');

/**
 * Calculate per-annum compounding growth from 2014 to 2060, since that's how a lot of the WEC numbers are estimated.
 * @param {number} start2014 Principal value in 2014
 * @param {number} pct Number from 0-1, percent p.a. growth from 2014-2030.
 *   If pct2030 not specified, interpretted as p.a. growth from 2014-2060.
 * @param {number} [pct2030] Optional.  Number from 0-1, percent p.a. growth from 2030-2060.
 * @return {number} Compounded growth of principal
 */
function perAnnumCompoundGrowth(start2014, pct, pct2030) {
  if (pct2030 === undefined) {
    return start2014 * Math.pow(1.0 + pct, 2060 - 2014);
  }

  return start2014 * Math.pow(1.0 + pct, 2030 - 2014) * Math.pow(1.0 + pct2030, 2060 - 2030);
}

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


const TRANSPORT_CONSUMPTION_MTOE = {
  // 2014, 2030, and 2060 energy demand, in MTOE
  modernJazz: [2619, 3179, 3423], // page 44
  unfinishedSymphony: [2619, 3050, 3123], // page 65
  hardRock: [2619, 3256, 3904], // page 83
};

// const TRANSPORT_CONSUMPTION_GROWTH_PCT = _.mapValues(TRANSPORT_CONSUMPTION_MTOE, years => ({
//   2030: years[1] / years[0],
//   2060: years[2] / years[0],
// }));

const TRANSPORT_SHARE = {
  modernJazz: {
    // page 44
    2014: {
      petroleum: 0.92,
      naturalGas: 0.04,
      biomass: 0.03,
      electricity: 0.01,
    },
    2030: {
      petroleum: 0.90,
      naturalGas: 0.03,
      biomass: 0.05,
      electricity: 0.02,
    },
    2060: {
      petroleum: 0.67,
      naturalGas: 0.07,
      biomass: 0.16,
      electricity: 0.08,
      // hydrogen: 0.02
    },
  },
  unfinishedSymphony: {
    // page 65
    2014: {
      petroleum: 0.92,
      naturalGas: 0.04,
      biomass: 0.03,
      electricity: 0.01,
    },
    2030: {
      petroleum: 0.87,
      naturalGas: 0.03,
      biomass: 0.08,
      electricity: 0.02,
    },
    2060: {
      petroleum: 0.60,
      naturalGas: 0.06,
      biomass: 0.21,
      electricity: 0.10,
      // hydrogen: 0.03
    },
  },
  hardRock: {
    // page 83
    2014: {
      petroleum: 0.92,
      naturalGas: 0.04,
      biomass: 0.03,
      electricity: 0.01,
    },
    2030: {
      petroleum: 0.90,
      naturalGas: 0.04,
      biomass: 0.04,
      electricity: 0.02,
    },
    2060: {
      petroleum: 0.78,
      naturalGas: 0.07,
      biomass: 0.10,
      electricity: 0.04,
      // hydrogen: 0.01
    },
  },
};

// TRANSPORTATION INTERPOLATION: For each plan, figure out the percent increase in each source.
// We will interpolate the LLNL numbers by the corresponding percent increases.
const TRANSPORT_PCT_INCREASES_BY_PLAN_AND_SOURCE = _.mapValues(TRANSPORT_SHARE, (planData, planKey) => ({
  2030: _.mapValues(planData['2030'], (yearSource, sourceKey) =>
    (yearSource * TRANSPORT_CONSUMPTION_MTOE[planKey][1]) /
    (planData['2014'][sourceKey] * TRANSPORT_CONSUMPTION_MTOE[planKey][0])
  ),
  2060: _.mapValues(planData['2060'], (yearSource, sourceKey) =>
    (yearSource * TRANSPORT_CONSUMPTION_MTOE[planKey][2]) /
    (planData['2014'][sourceKey] * TRANSPORT_CONSUMPTION_MTOE[planKey][0])
  ),
}));

const RESIDENTIAL_COMMERCIAL_INCREASES_CALCS_BY_PLAN = {
  // Section 2.2.5.1.1.3 Residential and Commercial, pg 45
  modernJazz: l => perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.008, 0.003),

  // Section 2.3.5.1.4 Residential and Commercial
  unfinishedSymphony: l => perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.006, 0),

  // 2.4.5.1.4 Residential and Commercial
  hardRock: l => perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.008, 0.003),
};

const INDUSTRIAL_INCREASES_CALCS_BY_PLAN = {
  modernJazz: l => {
    if (l.source.id === 'petroleum') {
      // Section 2.2.5.1.1.4 Non Energy Use -- assume only petroleum --> industrial falls under this category (eg plastics)
      // Since doing US, use only the "mature economy" 0.9% pa growth number.
      return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.009);
    }

    // Else, Section 2.2.5.1.1.1 Industry.  Since we're doing US, we're going to use only the 0.3% 'service-led' growth
    return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.003);
  },

  unfinishedSymphony: l => {
    if (l.source.id === 'petroleum') {
      // Sect. 2.3.5.1.5 Non-Energy Use -- assume only petroleum --> industrial falls under this category (eg plastics)
      // Since doing US, use only the "mature economy" 0.6% pa growth number.
      return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.006);
    }

    // Else, 2.3.5.1.2 Industry.
    return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.015, 0.0);
  },

  hardRock: l => {
    if (l.source.id === 'petroleum') {
      // Sect. 2.4.5.1.5 Non-Energy Use -- assume only petroleum --> industrial falls under this category (eg plastics)
      // Since doing US, use only the "mature economy" 0.6% pa growth number.
      return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.006);
    }

    // Else, 2.4.5.1.2 Industry
    return perAnnumCompoundGrowth(l.data.energy2014.value.TWh, 0.017, 0.005);
  },
};

/**
 * Interpolates energy usage in 2016 to electricity sources according to WEC scenarios report.
 * @param {object} link
 * @param {'modernJazz' | 'unfinishedSymphony' | 'hardRock'} wecScenarioKey Defaults to 'hardRock'
 */
module.exports = function interpolateEnergyIn2060(link, wecScenarioKey = 'hardRock') {
  let linkTargetId = link.target.id;

  if (linkTargetId === 'electricity') {
    let growthDefn = ELECTRICITY_SOURCE_2060_GROWTHS[link.source.id];

    if (!growthDefn) {
      throw new Error(`[model:wecWorldEnergyScenarios] Unable to find 2060 WEC electricity prediction for source '${link.source.id}'`);
    }

    return link.data.energy2014.value.TWh * growthDefn[wecScenarioKey];
  }

  if (linkTargetId === 'residential' && link.source.id === 'solar') {
    // WEC report doesn't breakdown solar for electricity vs. solar for residential.
    // Interpolating both at the same electricity growth rate gets us closer to the relative primary energy breakdowns
    // than using the residential per-annum increases, so assume both are grouped under electricity.
    return link.data.energy2014.value.TWh * ELECTRICITY_SOURCE_2060_GROWTHS.solar[wecScenarioKey];
  }

  if (linkTargetId === 'transportation') {
    let growthDefn = _.get(TRANSPORT_PCT_INCREASES_BY_PLAN_AND_SOURCE, [wecScenarioKey, '2060', link.source.id]);

    if (growthDefn === undefined) {
      throw new Error(`[model:wecWorldEnergyScenarios] Unable to find 2060 WEC transportation prediction for source '${link.source.id}'`);
    }

    return link.data.energy2014.value.TWh * growthDefn;
  }

  if (linkTargetId === 'residential' || linkTargetId === 'commercial') {
    return RESIDENTIAL_COMMERCIAL_INCREASES_CALCS_BY_PLAN[wecScenarioKey](link);
  }

  if (linkTargetId === 'industrial') {
    return INDUSTRIAL_INCREASES_CALCS_BY_PLAN[wecScenarioKey](link);
  }

  return link.data.energy2014.value.TWh;
};
