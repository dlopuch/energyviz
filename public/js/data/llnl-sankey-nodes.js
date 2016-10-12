/**
 * This file enumerates the nodes used in the Lawrence Livermore National Laboratory flowchart series
 * https://flowcharts.llnl.gov
 */

module.exports = [
  {
    id: 'solar',
    name: 'Solar',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'nuclear',
    name: 'Nuclear',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'hydro',
    name: 'Hydro',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'wind',
    name: 'Wind',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'geothermal',
    name: 'Geothermal',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'naturalGas',
    name: 'Natural Gas',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'coal',
    name: 'Coal',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'biomass',
    name: 'Biomass',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'petroleum',
    name: 'Petroleum',
    category: 'source',

    styleLinkOut: true,
  },
  {
    id: 'electricity',
    name: 'Electricity Generation',
    category: 'consumer',

    styleLinkOut: l => (l.target === 'rejectedEnergy' || l.target === 'carbonEmissions' ? false : 'electricity'),
  },
  {
    id: 'residential',
    name: 'Residential',
    category: 'consumer',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    category: 'consumer',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    category: 'consumer',
  },
  {
    id: 'transportation',
    name: 'Transportation',
    category: 'consumer',
  },


  // Consumption Sankeys
  {
    id: 'rejectedEnergy',
    name: 'Rejected Energy',
    category: 'analysis',

    styleLinkIn: true,
    _whichSankey: 'consumption',
  },
  {
    id: 'energyServices',
    name: 'Energy Services',
    category: 'analysis',

    styleLinkIn: true,
    _whichSankey: 'consumption',
  },


  // CO2 Sankeys
  {
    id: 'carbonEmissions',
    name: 'Carbon Emissions',
    category: 'analysis',

    styleLinkIn: true,
    _whichSankey: 'emissions',
  },
];
