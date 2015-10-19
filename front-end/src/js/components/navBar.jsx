var React = require('react');

var NavBar = React.createClass({

  render: function () {
    return (
      <div className="navbar">
        <p className="customer-indentifier">Customer</p>
        <div className="center-controller">
          <h4>Work History</h4>
          <h4>New Invoice</h4>
        </div>
        <p className="user-indentifier">User</p>
      </div>
    )
  }

})

module.exports = NavBar;
