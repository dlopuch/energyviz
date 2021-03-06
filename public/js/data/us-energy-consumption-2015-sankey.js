/**
 * 2015 US Energy Consumption Sankey Flow Diagram by Lawrence Livermore National Laboratory
 * Transcribed from https://flowcharts.llnl.gov/content/assets/images/energy/us/Energy_US_2015.png
 *
 * Data Source: Lawrence Livermore National Laboratory and the Department of Energy
 */

/** Links in the Sankey diagram */
const LINKS = [
  // All values in units of Quads as transcribed from
  //   https://flowcharts.llnl.gov/content/assets/images/energy/us/Energy_US_2015.png
  {
    source: 'solar',
    target: 'electricity',
    value: 0.25,
  },
  {
    source: 'solar',
    target: 'residential',
    value: 0.28,
  },
  {
    source: 'nuclear',
    target: 'electricity',
    value: 8.34,
  },
  {
    source: 'hydro',
    target: 'electricity',
    value: 2.38,
  },
  {
    source: 'hydro',
    target: 'industrial',
    value: 0.01,
  },
  {
    source: 'wind',
    target: 'electricity',
    value: 1.81,
  },
  {
    source: 'geothermal',
    target: 'electricity',
    value: 0.16,
  },
  {
    source: 'geothermal',
    target: 'residential',
    value: 0.04,
  },
  {
    source: 'geothermal',
    target: 'commercial',
    value: 0.02,
  },
  {
    source: 'naturalGas',
    target: 'electricity',
    value: 9.99,
  },
  {
    source: 'naturalGas',
    target: 'residential',
    value: 4.75,
  },
  {
    source: 'naturalGas',
    target: 'commercial',
    value: 3.3,
  },
  {
    source: 'naturalGas',
    target: 'industrial',
    value: 9.36,
  },
  {
    source: 'naturalGas',
    target: 'transportation',
    value: 0.92,
  },
  {
    source: 'coal',
    target: 'electricity',
    value: 14.3,
  },
  {
    source: 'coal',
    target: 'commercial',
    value: 0.06,
  },
  {
    source: 'coal',
    target: 'industrial',
    value: 1.41,
  },
  {
    source: 'biomass',
    target: 'electricity',
    value: 0.52,
  },
  {
    source: 'biomass',
    target: 'residential',
    value: 0.45,
  },
  {
    source: 'biomass',
    target: 'commercial',
    value: 0.13,
  },
  {
    source: 'biomass',
    target: 'industrial',
    value: 2.28,
  },
  {
    source: 'biomass',
    target: 'transportation',
    value: 1.35,
  },
  {
    source: 'petroleum',
    target: 'electricity',
    value: 0.28,
  },
  {
    source: 'petroleum',
    target: 'residential',
    value: 0.98,
  },
  {
    source: 'petroleum',
    target: 'commercial',
    value: 0.56,
  },
  {
    source: 'petroleum',
    target: 'industrial',
    value: 8.2,
  },
  {
    source: 'petroleum',
    target: 'transportation',
    value: 25.4,
  },
  {
    source: 'electricity',
    target: 'residential',
    value: 4.78,
  },
  {
    source: 'electricity',
    target: 'commercial',
    value: 4.63,
  },
  {
    source: 'electricity',
    target: 'industrial',
    value: 3.27,
  },
  {
    source: 'electricity',
    target: 'transportation',
    value: 0.03,
  },
  {
    source: 'electricity',
    target: 'rejectedEnergy',
    value: 25.4,
  },
  {
    source: 'residential',
    target: 'rejectedEnergy',
    value: 3.95,
  },
  {
    source: 'residential',
    target: 'energyServices',
    value: 7.33,
  },
  {
    source: 'commercial',
    target: 'rejectedEnergy',
    value: 3.05,
  },
  {
    source: 'commercial',
    target: 'energyServices',
    value: 5.66,
  },
  {
    source: 'industrial',
    target: 'rejectedEnergy',
    value: 4.91,
  },
  {
    source: 'industrial',
    target: 'energyServices',
    value: 19.6,
  },
  {
    source: 'transportation',
    target: 'rejectedEnergy',
    value: 21.9,
  },
  {
    source: 'transportation',
    target: 'energyServices',
    value: 5.81,
  },
];


module.exports = {
  links: LINKS,
};
