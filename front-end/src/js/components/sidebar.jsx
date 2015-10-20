var React = require('react');

var SideBar = React.createClass({

  sidebarToggle: function () {
    var sidebarToggle = document.getElementsByClassName('sidebar-wrapper')[0].classList;
    var sidebarInfo = document.getElementsByClassName('sidebar-info')[0].classList;
    var invoiceManager = document.getElementsByClassName('invoice-manager')[0].classList;
    invoiceManager[1] == 'invoice-manager-full' ? invoiceManager.remove('invoice-manager-full') : invoiceManager.add('invoice-manager-full');
    sidebarInfo[1] == 'info-closed' ? setTimeout(function() {sidebarInfo.remove('info-closed')}, 400) : sidebarInfo.add('info-closed');
    sidebarToggle[1] == 'toggle-closed' ? sidebarToggle.remove('toggle-closed') : sidebarToggle.add('toggle-closed');
  },
  addCustomer: function () {
    var name = document.getElementsByClassName('new-customer')[0];
    this.props.handlers.addCustomer(name.value);
    name.value = null;
  },
  selectCustomer: function (e) {
    this.props.handlers.selectCustomer(e.target.getAttribute('data-id'));
  },
  render: function () {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-top">
          <span className="sidebar-toggle fa fa-exchange" onClick={this.sidebarToggle}></span>
        </div>
        <div className="sidebar-info">
          <h3 className="sidebar-heading">Customers</h3>
          <input className="new-customer" placeholder="New Customer"></input>
          <span className="add-customer fa fa-plus" onClick={this.addCustomer}></span>
          <ul className="customer-list">
            {
              this.props.customers.map(function (customer, i) {
                return (
                   <li key={customer._id} index={i}>
                     <div>
                       <span className="user-icon fa fa-user"></span>
                       <span data-id={customer._id} onClick={this.selectCustomer}>{customer.name}</span>
                     </div>
                   </li>
                )
              }, this)
            }
          </ul>
        </div>
      </div>
    )
  }

})

module.exports = SideBar;
