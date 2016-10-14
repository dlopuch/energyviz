const d3 = require('d3');

const MultiSankeyLayout = require('./llnlEnergySankey').LlnlMultiSankeyLayout;

require('../style/energySankey.less');

module.exports = function() {
  let margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  let svg = d3.select('#multi_sankey').append('svg')
    .classed('sankey', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  let formatNumber = d3.format(',.0f');
  let format = function (d) {
    return `${formatNumber(d)} TWh`;
  };

  let multiSankeyLayout = new MultiSankeyLayout({
    width,
    height,
    nodePadding: 5,
    nodeWidth: 10,
  });

  let layoutData = multiSankeyLayout.calculateLayout();

  window.msLayout = multiSankeyLayout;
  window.msLayoutData = layoutData;

  let linkPathGenerator = MultiSankeyLayout.makeLinkPathGenerator();

  let link = svg.append('g').classed('sankey-links', true).selectAll('.link')
    .data(layoutData.links)
    .enter().append('path')
      .attr('class', d => `link ${d.data.style || ''}`);

  link.append('title')
    .text(d => `${d.source.data.name} → ${d.target.data.name}\n${format(d.values.energy)}`);

  let nodes = svg.append('g').classed('sankey-nodes', true).selectAll('.node')
    .data(layoutData.nodes)
    .enter().append('g')
      .attr('class', d => `node ${d.id || ''}`);

  let nodeRects = nodes.append('rect');
    // .style('fill', d => d.color = 'black') // color(d.name.replace(/ .*/, ''));
    // .style('stroke', d => d3.rgb(d.color).darker(2))

  nodeRects
    .append('title')
    .text(d => `${d.data.name}\n${format(d.values.energy)}`);

  let nodeLabels = nodes.append('text')
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(d => d.data.name);

  nodeLabels
    .filter(d => d.x < width / 2)
    .attr('text-anchor', 'start');


  function _updateLayout(animate) {
    if (animate) {
      link.transition()
        .attr('d', linkPathGenerator)
        // stroke-width isn't recognized as a transition'able style.  Which is wrong.
        // So we make our own interpolator for the transition.
        .styleTween('stroke-width', function(l) {
          return d3.interpolateNumber(parseFloat(d3.select(this).style('stroke-width')) || 0, Math.max(2, l.dy));
        });
    } else {
      link
        .attr('d', linkPathGenerator)
        .style('stroke-width', d => Math.max(2, d.dy));
    }

    (animate ? nodes.transition() : nodes)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    (animate ? nodeRects.transition() : nodeRects)
      .attr('height', d => d.dy)
      .attr('width', d => d.dx);

    (animate ? nodeLabels.transition() : nodeLabels)
      .attr('x', -6)
      .attr('y', d => d.dy / 2)
      .filter(d => d.x < width / 2)
      .attr('x', d => 6 + d.dx);
  }

  function updateLayout(animate) {
    let newData = multiSankeyLayout.calculateLayout();
    // no need to d3 datajoin, it updates the data objects in place.  Just run layout against new numbers.
    _updateLayout(animate);
    return newData;
  }

  _updateLayout(false); // skip recalculate layout on first update -- already did it


  window.updateLayout = updateLayout;
  let is2014 = true;
  window.toggleYearAndUpdate = function toggleYear() {
    multiSankeyLayout.dataAndControls.setEnergyAccessor(
      is2014 ?
        multiSankeyLayout.dataAndControls.accessors.energy2015 :
        multiSankeyLayout.dataAndControls.accessors.energy2014
    );
    console.log(`Now showing ${is2014 ? '2015' : '2014'} data`);
    updateLayout(true);
    is2014 = !is2014;
  };
  console.log('Yo! try hitting toggleYearAndUpdate() to see example of transition!');
};
