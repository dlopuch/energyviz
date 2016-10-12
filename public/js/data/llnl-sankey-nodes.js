/**
 * This file enumerates the nodes used in the Lawrence Livermore National Laboratory flowchart series
 * https://flowcharts.llnl.gov
 */

module.exports = [
  {
    id: 'solar',
    name: 'Solar',
    styleLinkOut: true,
  },
  {
    id: 'nuclear',
    name: 'Nuclear',
    styleLinkOut: true,
  },
  {
    id: 'hydro',
    name: 'Hydro',
    styleLinkOut: true,
  },
  {
    id: 'wind',
    name: 'Wind',
    styleLinkOut: true,
  },
  {
    id: 'geothermal',
    name: 'Geothermal',
    styleLinkOut: true,
  },
  {
    id: 'naturalGas',
    name: 'Natural Gas',
    styleLinkOut: true,
  },
  {
    id: 'coal',
    name: 'Coal',
    styleLinkOut: true,
  },
  {
    id: 'biomass',
    name: 'Biomass',
    styleLinkOut: true,
  },
  {
    id: 'petroleum',
    name: 'Petroleum',
    styleLinkOut: true,
  },
  {
    id: 'electricity',
    name: 'Electricity Generation',
    styleLinkOut: l => (l.target !== 'rejectedEnergy' ? 'electricity' : false),
  },
  {
    id: 'residential',
    name: 'Residential',
  },
  {
    id: 'commercial',
    name: 'Commercial',
  },
  {
    id: 'industrial',
    name: 'Industrial',
  },
  {
    id: 'transportation',
    name: 'Transportation',
  },


  // Consumption Sankeys
  {
    id: 'rejectedEnergy',
    name: 'Rejected Energy',
    styleLinkIn: true,
    _whichSankey: 'consumption',
  },
  {
    id: 'energyServices',
    name: 'Energy Services',
    styleLinkIn: true,
    _whichSankey: 'consumption',
  },


  // CO2 Sankeys
  {
    id: 'carbonEmissions',
    name: 'Carbon Emissions',
    styleLinkIn: true,
    _whichSankey: 'co2',
  },
];
