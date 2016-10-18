const React = require('react');
const reactRedux = require('react-redux');

const SankeyChart = require('./SankeyChart.jsx');

const SankeyUI = React.createClass({
  render() {
    return (
      <div>
        <span>Choose a model:</span>
        <div>
          {this.props.sankeyState.availableModels.map(model => (
            <div key={model.id} className="sankey-ui-model-picker">
              <button className="sankey-ui-pick-model">
                {model.id === this.props.sankeyState.activeModelId ? `*** ${model.name} ***` : model.name}
              </button>
              <button className="sankey-ui-prev-model">Prev</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
});

const SankeyContainer = (props) => (
  <div>
    <SankeyUI sankeyState={props.sankeyState}> </SankeyUI>
    <SankeyChart sankeyData={props.sankeyState.sankeyData}> </SankeyChart>
  </div>
);

module.exports = reactRedux.connect(
  function mapStateToProps(state) {
    return {
      sankeyState: state.sankey,
    };
  }
)(SankeyContainer);