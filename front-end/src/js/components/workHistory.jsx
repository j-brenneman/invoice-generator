var React = require('react');

var WorkHistory = React.createClass({
  customerHistory: function () {
    return this.props.invoices.filter(function (invoice) {
      if(invoice.customer._id === this.props.selectedCustomer._id){
        return invoice;
      }
    }, this)
  },
  render: function () {
    return (
      <div className="work-history-view">
        <table className="table table-bordered work-history-info">
          <thead>
            <th>Order</th><th>Date</th><th>View</th>
          </thead>
          <tbody>
            {this.customerHistory().map(function (invoice, i) {
              return (
                <tr key={i + invoice.customer._id}>
                  <td>{i +1}</td><td>Date</td><td onClick={this.props.selectInvoice.bind(this, i)}><span className="fa fa-file-o view-invoice"></span></td>
                </tr>
              )
            }, this)}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = WorkHistory;
