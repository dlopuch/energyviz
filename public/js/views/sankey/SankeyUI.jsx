const React = require('react');

module.exports = React.createClass({
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
