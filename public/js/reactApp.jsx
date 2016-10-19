const React = require('react');
const ReactDOM = require('react-dom');
const ReactReduxProvider = require('react-redux').Provider;

const Forward = require('./views/Forward.jsx');
const SankeyContainer = require('./views/sankey/SankeyContainer.jsx');
const store = require('./redux/store');

module.exports = function reactApp() {
  ReactDOM.render(
    <ReactReduxProvider store={store}>
      <div>
        <Forward> </Forward>
        <SankeyContainer> </SankeyContainer>
      </div>
    </ReactReduxProvider>,
    document.getElementById('react_app')
  );
}
