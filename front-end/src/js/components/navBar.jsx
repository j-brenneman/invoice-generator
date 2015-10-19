var React = require('react');

var NavBar = React.createClass({

  render: function () {
    return (
      <div className="navbar">
        <p className="customer-indentifier">Customer</p>
        <div className="center-controller">
          <button className="btn btn-primary">Work History</button>
          <button className="btn btn-primary">New Invoice</button>
        </div>
        <p className="user-indentifier">User</p>
      </div>
    )
  }

})

module.exports = NavBar;
