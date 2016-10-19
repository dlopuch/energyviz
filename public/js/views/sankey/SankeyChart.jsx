const React = require('react');
const ReactDOM = require('react-dom');

const multiSankey = require('../../charts/multiSankey');

const SankeyChart = React.createClass({
  shouldComponentUpdate() {
    // Let D3 scripts and bootstrap plugins manage the dom
    return false;
  },

  componentWillReceiveProps(nextProps) {
    // Here we hit the react escape hatch and let d3 update according to its own update rules.

    if (nextProps.sankeyData !== this.props.sankeyData) {
      setTimeout(() => {
        this.multiSankeyControls.updateLayout(nextProps.sankeyData);
      });
    }

    if (this.props.sinkMode !== undefined && nextProps.sinkMode !== this.props.sinkMode) {
      setTimeout(() => {
        if (nextProps.sinkMode === 'emissions') {
          this.multiSankeyControls.showEmissions();
        } else {
          this.multiSankeyControls.showEnergy();
        }
      });
    }
  },

  componentDidMount() {
    this.multiSankeyControls = multiSankey(ReactDOM.findDOMNode(this.refs.svgWrap), this.props.sankeyData);
  },

  render() {
    return (
      <div className="sankey-wrap" ref="svgWrap">
      </div>
    );
  }
});

module.exports = SankeyChart;