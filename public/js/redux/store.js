const redux = require('redux');

// Reducers
const sankey = require('./sankeyReducer');


const INITIAL_STATE = {
  sankey: sankey.INITIAL_STATE,
};

let reducers = redux.combineReducers({
  sankey: sankey.reducer,
});

module.exports = redux.createStore((state, action) => {
  if (state === undefined) return INITIAL_STATE;

  return reducers(state, action);
});
