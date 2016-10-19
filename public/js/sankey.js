const d3 = require('d3');
const d3Sankey = require('d3-sankey').sankey;

const energyDatasets = require('./data/us-energy-consumption-emissions-parser');

// preprocess:
let energy = energyDatasets.getConsumption2014('TWh');
energy.nodes = energy.nodes.filter(n => n.id !== 'energyServices');
energy.links = energy.links.filter(l => l.targetId !== 'energyServices');

window.energy = energy;

module.exports = function() {
  let margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  let svg = d3.select('#d3_sankey').append('svg')
    .classed('sankey', true)
    .classed('d3-sankey', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  let formatNumber = d3.format(',.0f');
  let format = function (d) {
    return `${formatNumber(d)} TWh`;
  };

  let sankey = d3Sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

  let path = sankey.link();

  sankey
    .nodes(energy.nodes)
    .links(energy.links)
    .layout(32);

  let link = svg.append('g').classed('sankey-links', true).selectAll('.link')
    .data(energy.links)
    .enter().append('path')
      .attr('class', d => `link ${d.style || ''}`)
      .attr('d', path)
      .style('stroke-width', d => Math.max(1, d.dy));

  link.append('title')
    .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

  let node = svg.append('g').classed('sankey-nodes', true).selectAll('.node')
    .data(energy.nodes)
    .enter().append('g')
      .attr('class', d => `node ${d.id || ''}`)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .call(d3.drag()
        .subject(d => d)
        .on('start', function () {
          this.parentNode.appendChild(this);
        })
        .on('drag', function dragmove(d) {
          d3.select(this).attr('transform', `translate(${d.x},${d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))})`);
          sankey.relayout();
          link.attr('d', path);
        })
      );

  node.append('rect')
    .attr('height', d => d.dy)
    .attr('width', sankey.nodeWidth())
    // .style('fill', d => d.color = 'black') // color(d.name.replace(/ .*/, ''));
    // .style('stroke', d => d3.rgb(d.color).darker(2))
    .append('title')
    .text(d => `${d.name}\n${format(d.value)}`);

  node.append('text')
    .attr('x', -6)
    .attr('y', d => d.dy / 2)
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(d => d.name)
    .filter(d => d.x < width / 2)
    .attr('x', 6 + sankey.nodeWidth())
    .attr('text-anchor', 'start');
};
