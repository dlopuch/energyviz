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

  renderTitleAndDescription() {
    if (this.props.sankeyState.activeModelId === 'llnl2014') {
      return (<div>
        <h4>2014 US Energy and Emissions Flow</h4>
        <small>Source: <a href="https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2014_United-States.png">Lawrence Livermore National Laboratory, Department of Energy</a></small>
      </div>);
    } else if (this.props.sankeyState.activeModelId === 'llnl2015') {
      return (<div>
        <h4>2015 US Energy and Emissions Flow</h4>
        2015 emissions not published, so emissions are interpolated assuming carbon intensities (emissions per unit
        energy) defined in the 2014 flowchart.<br/>
        <small>Source: <a href="https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2015_United-States.png">Lawrence Livermore National Laboratory, Department of Energy.</a></small>
      </div>)
    } else if (this.props.sankeyState.activeModelId === 'wecModernJazz') {
      return (<div>
        <h4>WEC's 2060 'Modern Jazz': Sustainable Growth Through Competitive Markets and Technology</h4>
        Sustainable economic growth driven primarily by market mechanisms.
        Sustainability is addressed with strong technological development, and a competitive market encourages new business models.
        Energy costs are reduced due to supply-side developments and mid-stream efficiency, resulting in greater access to energy for all.
        <br/><small>Source: <a href="http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Full-report.pdf">World Energy Council</a></small>
      </div>);
    } else if (this.props.sankeyState.activeModelId === 'wecUnfinishedSymphony') {
      return (<div>
        <h4>WEC's 2060 'Unfinished Symphony': Sustainable Growth Through Low-Carbon State Coordination</h4>
        Sustainable economic growth driven primarily by coordinated state policies.
        Sustainability is achieved by the world "ticking on the same clock", allowing global unified action.
        Green subsidies, carbon pricing, and new societal goals encourage "sharing economy" models that
        {this.props.sankeyState.sankeySinkMode === 'energy' ?
          " reduce energy demand" :
          (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEnergySinks}>
            <span className="glyphicon glyphicon-flash"> </span>&nbsp;reduce energy demand
          </button>)
        }
        . Cooperation and technology transfers favor large-scale, integrated solutions to reduce
        {this.props.sankeyState.sankeySinkMode === 'energy' ?
          (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEmissionsSinks}>
            <span className="glyphicon glyphicon-globe"> </span>&nbsp;carbon emissions
          </button>) :
          " cabon emissions"
        }.

        <br/><small>Source: <a href="http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Full-report.pdf">World Energy Council</a></small>
      </div>);
    } else if (this.props.sankeyState.activeModelId === 'wecHardRock') {
      return (<div>
        <h4>WEC's 2060 'Hard Rock': Unsustainable Growth Through Political Fragmentation</h4>
        Less sustainable economic growth resulting from political fragmentation and individual nationalist pursuits for energy security.
        Fear of becoming losers in the ever-increasing battle for resources and wealth leads to rising inequity as well
        as political and armed conflict.
        Large-scale energy solutions driven by domestic security concerns (hydro, nuclear, and fossil fuels dominate).
        Lack of resiliance creates growth volatility, and attention to
        {this.props.sankeyState.sankeySinkMode === 'energy' ?
          (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEmissionsSinks}>
            <span className="glyphicon glyphicon-globe"> </span>&nbsp;climate change
          </button>) :
          " climate change "
        }
        remains limited.
        <br/><small>Source: <a href="http://www.worldenergy.org/wp-content/uploads/2016/10/World-Energy-Scenarios-2016_Full-report.pdf">World Energy Council</a></small>
      </div>);
    } else {
      return ('');
    }
  },

  renderScenarioButtons() {
    let currentActiveModelId = this.props.sankeyState.activeModelId;
    return (<div>
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
            title="Preview"
          >
            <span className="glyphicon glyphicon-eye-open" title="Preview"> </span>
            <span style={{opacity: 0}}>.</span>
          </button>
        </div>
      ))}
    </div>);
  },

  render() {
    return (
      <div className="sankey-ui">
        <div className="row">
          <div className="col-md-8">
            <div className="jumbotron">
              <div style={{minHeight: 188}}>
                {this.renderTitleAndDescription()}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <small>Choose a different scenario:</small>
            {this.renderScenarioButtons()}
          </div>
        </div>
        <div className="row" style={{marginTop: 10, width: 940}}>
          <div className="text-right">
            {this.props.sankeyState.sankeySinkMode === 'energy' ?
              (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEmissionsSinks}>
                <span className="glyphicon glyphicon-globe"> </span>&nbsp;Show Emissions
              </button>) :
              (<button className="btn btn-default btn-xs" onClick={this.props.onToggleEnergySinks}>
                <span className="glyphicon glyphicon-flash"> </span>&nbsp;Show Energy Waste
              </button>)
            }
          </div>
        </div>
      </div>
    );
  }
});
