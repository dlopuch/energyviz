/**
 * 2014 Estimated US Carbon Emissions Sankey Flow Diagram by Lawrence Livermore National Laboratory
 * Transcribed from https://flowcharts.llnl.gov/commodities/carbon
 *
 * Data Source: Lawrence Livermore National Laboratory and the Department of Energy
 */

/** Links in the Sankey diagram */
const LINKS = [
  // All values in units of Million Metric Tons as transcribed from
  //   https://flowcharts.llnl.gov/commodities/carbon
  {
    source: 'solar',
    target: 'electricity',
    value: 0,
  },
  {
    source: 'solar',
    target: 'residential',
    value: 0,
  },
  {
    source: 'nuclear',
    target: 'electricity',
    value: 0,
  },
  {
    source: 'hydro',
    target: 'electricity',
    value: 0,
  },
  {
    source: 'hydro',
    target: 'industrial',
    value: 0,
  },
  {
    source: 'wind',
    target: 'electricity',
    value: 0,
  },
  {
    source: 'geothermal',
    target: 'electricity',
    value: 0.400,
  },
  {
    source: 'geothermal',
    target: 'residential',
    value: 0,
  },
  {
    source: 'geothermal',
    target: 'commercial',
    value: 0,
  },
  {
    source: 'naturalGas',
    target: 'electricity',
    value: 444,
  },
  {
    source: 'naturalGas',
    target: 'residential',
    value: 276,
  },
  {
    source: 'naturalGas',
    target: 'commercial',
    value: 188,
  },
  {
    source: 'naturalGas',
    target: 'industrial',
    value: 479,
  },
  {
    source: 'naturalGas',
    target: 'transportation',
    value: 50.0,
  },
  {
    source: 'coal',
    target: 'electricity',
    value: 1560,
  },
  {
    source: 'coal',
    target: 'commercial',
    value: 4.43,
  },
  {
    source: 'coal',
    target: 'industrial',
    value: 141,
  },
  {
    source: 'biomass',
    target: 'electricity',
    value: 0,
    // Note: The current generation of biofuels are not carbon neutral -- with full lifecycle considerations, it takes
    // net carbon to grow them. LLNL addresses this: "Combustion of biologically derived fuels is assumed to have zero
    // net carbon emissions - the lifecycle emissions associated with producing biofuels are included in commercial
    // and industrial emissions."
  },
  {
    source: 'biomass',
    target: 'residential',
    value: 0,
    // See note above
  },
  {
    source: 'biomass',
    target: 'commercial',
    value: 0,
    // See note above
  },
  {
    source: 'biomass',
    target: 'industrial',
    value: 0,
    // See note above
  },
  {
    source: 'biomass',
    target: 'transportation',
    value: 0,
    // See note above
  },
  {
    source: 'petroleum',
    target: 'electricity',
    value: 36.9,
  },
  {
    source: 'petroleum',
    target: 'residential',
    value: 64.9,
  },
  {
    source: 'petroleum',
    target: 'commercial',
    value: 39.6,
  },
  {
    source: 'petroleum',
    target: 'industrial',
    value: 342,
  },
  {
    source: 'petroleum',
    target: 'transportation',
    value: 1780,
  },
  {
    source: 'electricity',
    target: 'carbonEmissions',
    value: 2040,
  },
  {
    source: 'residential',
    target: 'carbonEmissions',
    value: 341,
  },
  {
    source: 'commercial',
    target: 'carbonEmissions',
    value: 232,
  },
  {
    source: 'industrial',
    target: 'carbonEmissions',
    value: 962,
  },
  {
    source: 'transportation',
    target: 'carbonEmissions',
    value: 1830,
  },
];


module.exports = {
  links: LINKS,
};
