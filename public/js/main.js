
// Webpack build has built-in less styling:
require('./style.less');

const sankey = require('./sankey');

window.onload = function() {
  sankey();
};
