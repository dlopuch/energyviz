const React = require('react');
const reactRedux = require('react-redux');

const SankeyChart = require('./SankeyChart.jsx');
const SankeyForward = require('./SankeyForward.jsx');
const SankeyUI = require('./SankeyUI.jsx');
const sankeyReducer = require('../../redux/sankeyReducer');

require('../../style/sankeyUi.less');

const SankeyContainer = (props) => (
  <div className="container-fluid">
    <SankeyForward
      sankeySinkMode={props.sankeyState.sankeySinkMode}
      onToggleEmissionsSinks={props.onToggleEmissionsSinks}
      onToggleEnergySinks={props.onToggleEnergySinks}
    > </SankeyForward>
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

    <div className="row">
      <div className="col-md-8">
        <h3>Experiment 1 Post-Mortem Notes</h3>
        <ul>
          <li>
            Still in progress.  Certain interpolations not done (key theme of WEC is increased electrification --
            haven't found a good way of interpolating electicity outputs yet).
          </li>
          <li>
            Interpolations are a bit iffy. <a href="https://github.com/dlopuch/energyviz/blob/master/public/js/models/wecWorldEnergyScenarios.js">Method</a> was
            to start with LLNL 2014 numbers, calculate growth rates in WEC reports
            and grow the 2014 numbers by that amount.  WEC predicted global trends, and since US didn't start with the same
            relative percentages, this resulted in different ending relative percentages of the various energy mixes.
          </li>
          <li>
            Some factors don't have data to interpolate.  The Waste Energy segments of the LLNL flowchart don't have a
            direct analogue in the WEC report beyond vague "more efficient" phrases.  WEC gave energy mix breakdowns for
            transportation, but industrial, commercial, and residential were harder to predict (and in some cases unchanged
            in the WEC models -- an interpolation method still needs to be determined).
          </li>
          <li>
            Emissions are calculated by taking the 2014 LLNL carbon intensities and applying them to the 2060 energy
            interpolations -- saying more energy creates more carbon at the same rate it did in 2014.  Big simplification
            especially since a lot of the WEC report assumed CCS technology.  Nevertheless, relative emissions between
            the WEC scenarios show the correct relative pattern of emissions, if maybe not quite at the right scales.
          </li>
          <li>
            Nevertheless, the visualization has demonstrated benefits of <a href="https://github.com/dlopuch/energyviz/blob/master/public/js/redux/sankeyReducer.js#L104">loading different data models</a> with
            vastly different data scales into a constant-structure sankey.  Followups could include:
            <ul>
              <li>how to highlight specific shifts (eg how to callout "this scenario predicts huge growth in natural gas")</li>
              <li>a 'relative scale' to highlight how when absolute values are more-or-less same magnitude, how the
                <em>relative</em> structure of industries would change under different scenarios</li>
              <li>an interactive editor where user can adjust values manually to see impact (could be fun to optimize emissions)</li>
            </ul>
          </li>
        </ul>
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