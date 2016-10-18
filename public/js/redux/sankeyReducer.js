const _ = require('lodash');

// redux boilerplate
const assign = (state, newState) => _.assign({}, state, newState);

const AVAILABLE_MODELS = [
  { id: 'llnl2014', name: 'US 2014' },
  { id: 'llnl2015', name: 'US 2015' },
  { id: 'wecModernJazz', name: 'WEC 2060 Modern Jazz' },
  { id: 'wecUnfinishedSymphony', name: 'WEC 2060 Unfinished Symphony' },
  { id: 'wecHardRock', name: 'WEC 2060 Hard Rock' },
];

const ACTIONS = {
  CHANGE_MODEL: { type: 'SANKEY_CHANGE_MODEL', newModelId: null },
};

exports.actions = {
  changeModel: (newModelId) => assign(ACTIONS.CHANGE_MODEL, { newModelId }),
};

exports.INITIAL_STATE = {
  activeModelId: 'llnl2014',
  availableModels: AVAILABLE_MODELS.map(m => ({ id: m.id, name: m.name })),
  sankeyData: null,
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
    });
  }

  // default
  return state;
};
