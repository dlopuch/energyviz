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
        <div className="row">
          <div className="col-md-12">
            <span>Choose a model:</span>
            <div>
              {this.props.sankeyState.availableModels.map(model => (
                <div key={model.id} className="btn-group btn-group-sm sankey-ui-model-picker">
                  <button
                    className={`btn btn-default sankey-ui-pick-model ${model.id === this.props.sankeyState.activeModelId ?
                      'btn-primary' :
                      ''}`}
                    onClick={this.props.onSelectNewModelId.bind(this, model.id)}
                  >
                    {model.name}
                  </button>
                  <button
                    className={`btn btn-default ${model.id === this.props.sankeyState.activeModelId ? 'btn-primary' : ''}`}
                    onMouseDown={this.onPreviewModelId.bind(this, currentActiveModelId, model.id)}
                    onClick={this.onUnpreviewModelId}
                  >
                    <span className="glyphicon glyphicon-eye-open" title="Preview"> </span>
                    <span style={{opacity: 0}}>.</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-right" style={{marginTop: 10, width: 940}}>
              {this.props.sankeyState.sankeySinkMode === 'energy' ?
                (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEmissionsSinks}>Show Emissions</button>) :
                (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEnergySinks}>Show Energy Waste</button>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
