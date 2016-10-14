/**
 * A dynamic sankey alternative to d3-sankey.
 *
 * Nodes are model-based -- they can programatically change values, which allows transitions on the layout (something
 * that d3-sankey struggles with).
 *
 * In addition, it's a multi-unit sankey -- left side is consumption (eg TWh), right side is emissions (eg MMT CO2).
 * This creates some non-traditional scaling discontinuities.
 *
 * Due to these peculiarities, this is NOT a general-purpse sankey generator.  There are specific code paths designed
 * specifically for the LLNL sankey layout.  In particular, there is no layout solver -- we assume a known general
 * layout, and only implement code needed to resize.
 */

const core = require('./sankeyCore');
const llnlSankeyNodes = require('./llnlSankeyNodes');
const LlnlMultiSankeyLayout = require('./LlnlMultiSankeyLayout');

module.exports = {
  SankeyNode: core.SankeyNode,
  SankeyLink: core.SankeyLink,
  llnlSankeyNodes: llnlSankeyNodes(),
  LlnlMultiSankeyLayout,
  _SankeyEngine: core.SankeyEngine,
};
