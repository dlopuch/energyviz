
// Webpack build has built-in less styling:
require('./style.less');

// const sankey = require('./sankey');
// const multiSankey = require('./charts/multiSankey');
const reactApp = require('./reactApp.jsx');

window._ = require('lodash');
window.d3 = require('d3');
window.sankeyEmissionsInterpolator = require('./models/sankeyEmissionInterpolator');
window.datasets = require('./data/us-energy-consumption-emissions-parser');
window.llnlEnergySankey = require('./charts/llnlEnergySankey');
window.store = require('./redux/store');


window.onload = function() {
  // sankey();
  // multiSankey();
  reactApp();
};
