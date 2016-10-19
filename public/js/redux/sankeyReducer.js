const _ = require('lodash');

// The d3 layout calculator
const LlnlMultiSankyLayout = require('../charts/llnlEnergySankey').LlnlMultiSankeyLayout;

const emissionsInterpolator = require('../models/sankeyEmissionInterpolator');
const wecWorldEnergyScenarios = require('../models/wecWorldEnergyScenarios');

// redux boilerplate
const assign = (state, newState) => _.assign({}, state, newState);

// TODO: The layout generator needs the widget size.  Normally this is a presentation concern, but we can't generate
// a layout (and therefore initial data) without knowing this.  Can probably wire in a better initialization action
// loop, but for now this is duplicated inside multiSankey.js
const SANKEY_WIDGET_CONFIG = {
  margin: {
    top: 10,
    right: 40,
    bottom: 15,
    left: 50,
  },
};
SANKEY_WIDGET_CONFIG.width = 960 - SANKEY_WIDGET_CONFIG.margin.left - SANKEY_WIDGET_CONFIG.margin.right;
SANKEY_WIDGET_CONFIG.height = 500 - SANKEY_WIDGET_CONFIG.margin.top - SANKEY_WIDGET_CONFIG.margin.bottom;


const multiSankeyLayout = new LlnlMultiSankyLayout({
  width: SANKEY_WIDGET_CONFIG.width,
  height: SANKEY_WIDGET_CONFIG.height,
  nodePadding: 5,
  nodeWidth: 10,
});

let wecModernJazzEnergyAccessor = l => wecWorldEnergyScenarios(l, 'modernJazz');
let wecUnfinishedSymphonyEnergyAccessor = l => wecWorldEnergyScenarios(l, 'unfinishedSymphony');
let wecHardRockEnergyAccessor = l => wecWorldEnergyScenarios(l, 'hardRock');

const AVAILABLE_MODELS = [
  {
    id: 'llnl2014',
    name: 'US 2014',
    energyAccessor: multiSankeyLayout.llnlSankeyPieces.accessors.energy2014,
    emissionsAccessor: multiSankeyLayout.llnlSankeyPieces.accessors.emissions2014,
  },
  {
    id: 'llnl2015',
    name: 'US 2015',
    energyAccessor: multiSankeyLayout.llnlSankeyPieces.accessors.energy2015,
    emissionsAccessor: l => emissionsInterpolator(l, multiSankeyLayout.llnlSankeyPieces.accessors.energy2015, 'TWh', 'MMT'),
  },
  {
    id: 'wecModernJazz',
    name: 'WEC 2060 Modern Jazz',
    energyAccessor: wecModernJazzEnergyAccessor,
    emissionsAccessor: l => emissionsInterpolator(l, wecModernJazzEnergyAccessor, 'TWh', 'MMT'),
  },
  {
    id: 'wecUnfinishedSymphony',
    name: 'WEC 2060 Unfinished Symphony',
    energyAccessor: wecUnfinishedSymphonyEnergyAccessor,
    emissionsAccessor: l => emissionsInterpolator(l, wecUnfinishedSymphonyEnergyAccessor, 'TWh', 'MMT'),
  },
  { id: 'wecHardRock',
    name: 'WEC 2060 Hard Rock',
    energyAccessor: wecHardRockEnergyAccessor,
    emissionsAccessor: l => emissionsInterpolator(l, wecHardRockEnergyAccessor, 'TWh', 'MMT'),
  },
];

const ACTIONS = {
  CHANGE_MODEL: { type: 'SANKEY_CHANGE_MODEL', newModelId: null },
  TOGGLE_SINK_MODE: { type: 'SANKEY_SINK_MODE', newSinkMode: 'energy' },
};

exports.actions = {
  changeModel: (newModelId) => assign(ACTIONS.CHANGE_MODEL, { newModelId }),
  toggleEmissionsSinks: () => assign(ACTIONS.TOGGLE_SINK_MODE, { newSinkMode: 'emissions' }),
  toggleEnergySinks: () => assign(ACTIONS.TOGGLE_SINK_MODE, { newSinkMode: 'energy' }),
};

let initialModel = _.find(AVAILABLE_MODELS, { id: 'llnl2014' });
exports.INITIAL_STATE = {
  activeModelId: initialModel.id,
  availableModels: AVAILABLE_MODELS.map(m => ({ id: m.id, name: m.name })),
  sankeyData: multiSankeyLayout.calculateLayout(initialModel.energyAccessor, initialModel.emissionsAccessor),

  /** {'energy' | 'emissions'} Whether the sankey shows waste energy (TWh) or emissions (MMT CO2, hence multiSankey) */
  sankeySinkMode: 'energy',
};

exports.reducer = function reduceSankey(state, action) {
  if (state === undefined) return exports.INITIAL_STATE;

  if (action.type === ACTIONS.CHANGE_MODEL.type) {
    let newModel = _.find(AVAILABLE_MODELS, { id: action.newModelId });
    if (!newModel) {
      console.warn('Invalid model selected for CHANGE_MODEL action:', action);
      return state;
    }
    return assign(state, {
      activeModelId: newModel.id,

      // Note: by nature of d3 work and various optimizations, this is not a pure function.  sorry redux, yolo!
      sankeyData: multiSankeyLayout.calculateLayout(newModel.energyAccessor, newModel.emissionsAccessor),
    });
  }

  if (action.type === ACTIONS.TOGGLE_SINK_MODE.type) {
    return assign(state, {
      sankeySinkMode: action.newSinkMode,
    });
  }

  // default
  return state;
};
