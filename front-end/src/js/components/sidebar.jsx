var React = require('react');

var SideBar = React.createClass({

  render: function () {
    return (
      <div id="sidebar-wrapper">
        <h3>Customers</h3>
        <ul className="sidebar">
          <li>Ben</li>
          <li>Derek</li>
          <li>Joann</li>
        </ul>
      </div>
    )
  }

})

module.exports = SideBar;
