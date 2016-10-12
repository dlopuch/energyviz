/**
 * 2015 US Energy Consumption Sankey Flow Diagram by Lawrence Livermore National Laboratory
 * Transcribed from https://flowcharts.llnl.gov/content/assets/images/energy/us/Energy_US_2015.png
 *
 * Data Source: Lawrence Livermore National Laboratory and the Department of Energy
 */

/** Nodes in the Sankey diagram */
const NODES = [
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
  {
    id: 'rejectedEnergy',
    name: 'Rejected Energy',
    styleLinkIn: true,
  },
  {
    id: 'energyServices',
    name: 'Energy Services',
    styleLinkIn: true,
  },
];

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

// apply energy conversions
LINKS.forEach(l => {
  l.value = {
    quads: l.value,

    // conversions from https://en.wikipedia.org/wiki/Quad_(unit)
    TWh: l.value * 293.07,
    MTOE: l.value * 25.2, // Million Tonnes of Oil Equivalent
  };
});


let nodesById = {};
NODES.forEach(n => nodesById[n.id] = n);


// Validate links
LINKS.forEach(l => {
  // Prevent typos
  if (!nodesById[l.source]) {
    throw new Error(`Invalid link source '${l.source}' for link ${JSON.stringify(l, null, '  ')}`);
  }

  if (!nodesById[l.target]) {
    throw new Error(`Invalid link target '${l.target}' for link ${JSON.stringify(l, null, '  ')}`);
  }
});


// Apply styles to links
LINKS.forEach(l => {
  let styleLinkIn = nodesById[l.target].styleLinkIn;

  if (typeof styleLinkIn === 'function') {
    if (styleLinkIn(l)) {
      l.style = styleLinkIn(l);
    } // else, if function returns false, don't style
  } else if (styleLinkIn) {
    l.style = nodesById[l.target].id;
  }

  let styleLinkOut = nodesById[l.source].styleLinkOut;
  if (typeof styleLinkOut === 'function') {
    if (styleLinkOut(l)) {
      if (l.style) {
        // Fail-fast on double styles
        throw new Error(`Link getting double-styled by target and source: ${JSON.stringify(l, null, '  ')}`);
      }

      l.style = styleLinkOut(l);
    } // else, if function returns false, don't style
  } else if (styleLinkOut) {
    if (l.style) {
      // Fail-fast on double styles
      throw new Error(`Link getting double-styled by target and source: ${JSON.stringify(l, null, '  ')}`);
    }
    l.style = nodesById[l.source].id;
  }
});


// Change the source/target reference format of the links to fit d3-sankey
let nodeIndeciesById = {};
NODES.forEach((n, i) => nodeIndeciesById[n.id] = i);
LINKS.forEach(l => {
  l.sourceId = l.source;
  l.targetId = l.target;
  l.source = nodeIndeciesById[l.source];
  l.target = nodeIndeciesById[l.target];
});


module.exports = {
  links: LINKS,
  nodes: NODES,
};
