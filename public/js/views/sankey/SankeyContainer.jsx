const React = require('react');
const reactRedux = require('react-redux');

const SankeyChart = require('./SankeyChart.jsx');
const sankeyReducer = require('../../redux/sankeyReducer');

const SankeyUI = React.createClass({
  onPreviewModelId(currentModelId, previewModelId) {
    this.setState({
      lastRealModelId: currentModelId,
    });
    this.props.onSelectNewModelId(previewModelId);
  },
  onUnpreviewModelId() {
    this.props.onSelectNewModelId(this.state.lastRealModelId);
  },

  render() {
    let currentActiveModelId = this.props.sankeyState.activeModelId;
    return (
      <div>
        <span>Choose a model:</span>
        <div>
          {this.props.sankeyState.availableModels.map(model => (
            <div key={model.id} className="sankey-ui-model-picker">
              <button
                className="sankey-ui-pick-model"
                onClick={this.props.onSelectNewModelId.bind(this, model.id)}
              >
                {model.id === this.props.sankeyState.activeModelId ? `* ${model.name} *` : model.name}
              </button>
              <button
                className="sankey-ui-prev-model"
                onMouseDown={this.onPreviewModelId.bind(this, currentActiveModelId, model.id)}
                onClick={this.onUnpreviewModelId}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
        <div>
          {this.props.sankeyState.sankeySinkMode === 'energy' ?
            (<button onClick={this.props.onToggleEmissionsSinks}>Show Emissions</button>) :
            (<button onClick={this.props.onToggleEnergySinks}>Show Energy Waste</button>)
          }
        </div>
      </div>
    );
  }
});

const SankeyContainer = (props) => (
  <div>
    <SankeyUI
      sankeyState={props.sankeyState}
      onSelectNewModelId={props.onSelectNewModelId}
      onToggleEmissionsSinks={props.onToggleEmissionsSinks}
      onToggleEnergySinks={props.onToggleEnergySinks}
    > </SankeyUI>
    <SankeyChart
      sankeyData={props.sankeyState.sankeyData}
      sinkMode={props.sankeyState.sankeySinkMode}
    > </SankeyChart>
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