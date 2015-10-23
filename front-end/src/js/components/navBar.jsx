var React = require('react');

var NavBar = React.createClass({

  render: function () {
    return (
      <div className="navbar">
        <h4 className="customer-indentifier"><span className="label label-default">{this.props.selectedCustomer ? this.props.selectedCustomer.name : null}</span></h4>
        <div className="center-controller">
          <button className="btn btn-primary">New Invoice</button>
        </div>
      </div>
    )
  }

})

module.exports = NavBar;
