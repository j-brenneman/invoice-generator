var React = require('react');

var SideBar = React.createClass({

  sidebarToggle: function () {
    var sidebarToggle = document.getElementsByClassName('sidebar-wrapper')[0].classList;
    var sidebarInfo = document.getElementsByClassName('sidebar-info')[0].classList;
    var invoiceManager = document.getElementsByClassName('invoice-manager')[0].classList;
    invoiceManager[1] == 'invoice-manager-full' ? invoiceManager.remove('invoice-manager-full') : invoiceManager.add('invoice-manager-full');
    sidebarInfo[1] == 'info-closed' ? sidebarInfo.remove('info-closed') : sidebarInfo.add('info-closed');
    sidebarToggle[1] == 'toggle-closed' ? sidebarToggle.remove('toggle-closed') : sidebarToggle.add('toggle-closed');
  },
  render: function () {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-top">
          <span className="sidebar-toggle fa fa-exchange" onClick={this.sidebarToggle}></span>
        </div>
        <div className="sidebar-info">
          <h3 className="sidebar-heading">Customers</h3>
          <ul>
            <li>Ben</li>
            <li>Derek</li>
            <li>Joann</li>
          </ul>
        </div>
      </div>
    )
  }

})

module.exports = SideBar;
