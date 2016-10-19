const React = require('react');
const ReactDOM = require('react-dom');

const multiSankey = require('../../charts/multiSankey');

const SankeyChart = React.createClass({
  shouldComponentUpdate() {
    // Let D3 scripts and bootstrap plugins manage the dom
    return false;
  },

  componentWillReceiveProps(nextProps) {
    // Here we break react and just update the multiSankey d3 manually according to its own update rules.
    let nextModel = nextProps.sankeyState.activeModelId;

    setTimeout(() => {
      switch (nextModel) {
        case 'llnl2015':
          this.multiSankey.showLlnlYearData(2015);
          break;
        case 'wecModernJazz':
          this.multiSankey.showWec2060('modernJazz');
          break;
        case 'wecUnfinishedSymphony':
          this.multiSankey.showWec2060('unfinishedSymphony');
          break;
        case 'wecHardRock':
          this.multiSankey.showWec2060('hardRock');
          break;
        case 'llnl2014':
        default:
          this.multiSankey.showLlnlYearData(2014);
          break;
      };
    });
  },

  componentDidMount() {
    this.multiSankey = multiSankey(ReactDOM.findDOMNode(this.refs.svgWrap));
  },

  render() {
    return (
      <div className="sankey-wrap" ref="svgWrap">
      </div>
    );
  }
});

module.exports = SankeyChart;