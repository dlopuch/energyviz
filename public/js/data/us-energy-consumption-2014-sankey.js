/**
 * 2014 US Energy Consumption Sankey Flow Diagram by Lawrence Livermore National Laboratory
 * Transcribed from https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2014_United-States.png
 *
 * Data Source: Lawrence Livermore National Laboratory and the Department of Energy
 */


/** Links in the Sankey diagram */
const LINKS = [
  // All values in units of Quads as transcribed from
  //   https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2014_United-States.png
  {
    source: 'solar',
    target: 'electricity',
    value: 0.170,
  },
  {
    source: 'solar',
    target: 'residential',
    value: 0.252,
  },
  {
    source: 'nuclear',
    target: 'electricity',
    value: 8.33,
  },
  {
    source: 'hydro',
    target: 'electricity',
    value: 2.44,
  },
  {
    source: 'hydro',
    target: 'industrial',
    value: 0.0257,
  },
  {
    source: 'wind',
    target: 'electricity',
    value: 1.73,
  },
  {
    source: 'geothermal',
    target: 'electricity',
    value: 0.159,
  },
  {
    source: 'geothermal',
    target: 'residential',
    value: 0.0197,
  },
  {
    source: 'geothermal',
    target: 'commercial',
    value: 0.0197,
  },
  {
    source: 'naturalGas',
    target: 'electricity',
    value: 8.37,
  },
  {
    source: 'naturalGas',
    target: 'residential',
    value: 5.20,
  },
  {
    source: 'naturalGas',
    target: 'commercial',
    value: 3.55,
  },
  {
    source: 'naturalGas',
    target: 'industrial',
    value: 9.46,
  },
  {
    source: 'naturalGas',
    target: 'transportation',
    value: 0.942,
  },
  {
    source: 'coal',
    target: 'electricity',
    value: 16.4,
  },
  {
    source: 'coal',
    target: 'commercial',
    value: 0.0470,
  },
  {
    source: 'coal',
    target: 'industrial',
    value: 1.51,
  },
  {
    source: 'biomass',
    target: 'electricity',
    value: 0.507,
  },
  {
    source: 'biomass',
    target: 'residential',
    value: 0.580,
  },
  {
    source: 'biomass',
    target: 'commercial',
    value: 0.119,
  },
  {
    source: 'biomass',
    target: 'industrial',
    value: 2.30,
  },
  {
    source: 'biomass',
    target: 'transportation',
    value: 1.27,
  },
  {
    source: 'petroleum',
    target: 'electricity',
    value: 0.294,
  },
  {
    source: 'petroleum',
    target: 'residential',
    value: 0.945,
  },
  {
    source: 'petroleum',
    target: 'commercial',
    value: 0.561,
  },
  {
    source: 'petroleum',
    target: 'industrial',
    value: 8.16,
  },
  {
    source: 'petroleum',
    target: 'transportation',
    value: 24.8,
  },
  {
    source: 'electricity',
    target: 'residential',
    value: 4.79,
  },
  {
    source: 'electricity',
    target: 'commercial',
    value: 4.63,
  },
  {
    source: 'electricity',
    target: 'industrial',
    value: 3.26,
  },
  {
    source: 'electricity',
    target: 'transportation',
    value: 0.0265,
  },
  {
    source: 'electricity',
    target: 'rejectedEnergy',
    value: 25.8,
  },
  {
    source: 'residential',
    target: 'rejectedEnergy',
    value: 4.12,
  },
  {
    source: 'residential',
    target: 'energyServices',
    value: 7.66,
  },
  {
    source: 'commercial',
    target: 'rejectedEnergy',
    value: 3.13,
  },
  {
    source: 'commercial',
    target: 'energyServices',
    value: 5.81,
  },
  {
    source: 'industrial',
    target: 'rejectedEnergy',
    value: 4.95,
  },
  {
    source: 'industrial',
    target: 'energyServices',
    value: 19.8,
  },
  {
    source: 'transportation',
    target: 'rejectedEnergy',
    value: 21.4,
  },
  {
    source: 'transportation',
    target: 'energyServices',
    value: 5.68,
  },
];


module.exports = {
  links: LINKS,
};
