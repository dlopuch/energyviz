const React = require('react');
const reactRedux = require('react-redux');

const SankeyChart = require('./SankeyChart.jsx');
const SankeyUI = require('./SankeyUI.jsx');
const sankeyReducer = require('../../redux/sankeyReducer');

require('../../style/sankeyUi.less');

const SankeyContainer = (props) => (
  <div className="container-fluid">
    <SankeyUI
      sankeyState={props.sankeyState}
      onSelectNewModelId={props.onSelectNewModelId}
      onToggleEmissionsSinks={props.onToggleEmissionsSinks}
      onToggleEnergySinks={props.onToggleEnergySinks}
    > </SankeyUI>
    <div className="row">
      <div className="col-md-12">
        <SankeyChart
          sankeyData={props.sankeyState.sankeyData}
          sinkMode={props.sankeyState.sankeySinkMode}
        > </SankeyChart>
      </div>
    </div>
  </div>
);

module.exports = reactRedux.connect(
  function mapStateToProps(state) {
    return {
      sankeyState: state.sankey,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      onSelectNewModelId: modelId => dispatch(sankeyReducer.actions.changeModel(modelId)),
      onToggleEmissionsSinks: () => dispatch(sankeyReducer.actions.toggleEmissionsSinks()),
      onToggleEnergySinks: () => dispatch(sankeyReducer.actions.toggleEnergySinks()),
    };
  }
)(SankeyContainer);