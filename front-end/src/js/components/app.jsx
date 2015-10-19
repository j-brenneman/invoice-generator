var React = require('react');
var appStore = require('../stores/app_store');
var appActions = require('../actions/app_actions');
// Child Componets
var SideBar = require('./sidebar.jsx');
var NavBar = require('./NavBar.jsx');

var App = React.createClass({

  render: function () {
    return (
      <div>
        <SideBar />
        <div className="invoice-manager">
          <NavBar />
        </div>
      </div>
    )
  }

})

React.render(<App />, document.getElementById('app'));
