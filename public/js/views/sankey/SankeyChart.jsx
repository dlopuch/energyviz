const React = require('react');
const ReactDOM = require('react-dom');

const multiSankey = require('../../charts/multiSankey');

const SankeyChart = React.createClass({
  shouldComponentUpdate() {
    // Let D3 scripts and bootstrap plugins manage the dom
    return false;
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