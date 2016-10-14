/**
 * This file enumerates the nodes used in the Lawrence Livermore National Laboratory flowchart series
 * https://flowcharts.llnl.gov
 */

module.exports = [
  {
    id: 'nuclear',
    name: 'Nuclear',
    category: 'source',
    yOrder: 0,

    styleLinkOut: true,
  },
  {
    id: 'wind',
    name: 'Wind',
    category: 'source',
    yOrder: 1,

    styleLinkOut: true,
  },
  {
    id: 'solar',
    name: 'Solar',
    category: 'source',
    yOrder: 2,

    styleLinkOut: true,
  },
  {
    id: 'geothermal',
    name: 'Geothermal',
    category: 'source',
    yOrder: 3,

    styleLinkOut: true,
  },
  {
    id: 'hydro',
    name: 'Hydro',
    category: 'source',
    yOrder: 4,

    styleLinkOut: true,
  },
  {
    id: 'coal',
    name: 'Coal',
    category: 'source',
    yOrder: 5,

    styleLinkOut: true,
  },
  {
    id: 'naturalGas',
    name: 'Natural Gas',
    category: 'source',
    yOrder: 6,

    styleLinkOut: true,
  },
  {
    id: 'biomass',
    name: 'Biomass',
    category: 'source',
    yOrder: 7,

    styleLinkOut: true,
  },
  {
    id: 'petroleum',
    name: 'Petroleum',
    category: 'source',
    yOrder: 8,

    styleLinkOut: true,
  },


  {
    id: 'electricity',
    name: 'Electricity Generation',
    category: 'consumer',
    yOrder: 0,

    styleLinkOut: l => (l.target === 'rejectedEnergy' || l.target === 'carbonEmissions' ? false : 'electricity'),
  },
  {
    id: 'residential',
    name: 'Residential',
    category: 'consumer',
    yOrder: 1,
  },
  {
    id: 'commercial',
    name: 'Commercial',
    category: 'consumer',
    yOrder: 2,
  },
  {
    id: 'industrial',
    name: 'Industrial',
    category: 'consumer',
    yOrder: 3,
  },
  {
    id: 'transportation',
    name: 'Transportation',
    category: 'consumer',
    yOrder: 4,
  },


  // Consumption Sankeys
  {
    id: 'rejectedEnergy',
    name: 'Lost Energy (Inefficiency)',
    category: 'analysis',
    yOrder: 0,

    styleLinkIn: true,
    whichSankey: 'consumption',
  },
  {
    id: 'energyServices',
    name: 'Energy Services',
    category: 'analysis',
    yOrder: 1,

    styleLinkIn: true,
    whichSankey: 'consumption',
  },


  // CO2 Sankeys
  {
    id: 'carbonEmissions',
    name: 'Carbon Emissions',
    category: 'analysis',
    yOrder: 2,

    styleLinkIn: true,
    whichSankey: 'emissions',
  },
];
