
// Webpack build has built-in less styling:
require('./style.less');

const sankey = require('./sankey');

window._ = require('lodash');
window.sankeyEmissionsInterpolator = require('./models/sankeyEmissionInterpolator');
window.datasets = require('./data/us-energy-consumption-emissions-parser');

window.onload = function() {
  sankey();
};
