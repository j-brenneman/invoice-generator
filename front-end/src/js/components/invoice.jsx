var React = require('react');
var money = require('money-math');

var Invoice = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    this.props.current.grandTotal = nextProps.current.grandTotal
  },
  render: function () {
    return (
      <div className="invoiceView row">
        <div className="row invoiceHeading">
          <div className="text-center col-md-4">
            <h3>Invoice</h3>
          </div>
          <div className="col-md-8 customer-total">
            <p>{this.props.current.customer.name ? 'Customer: ' + this.props.current.customer.name : null}</p>
            <p>{'Grand Total: ' + '$' +this.props.current.grandTotal}</p>
          </div>
        </div>
        <div className="invoice-jobs-view row">
          {this.props.current.workEntries.map(function (workEntry, i) {
            return <div key={workEntry.date.timeStamp + i} className="invoice-work-entry">
                      <div className="row">
                        <div className="col-md-6">
                          <h4><strong>{workEntry.job.title}</strong><span>{' ('+ workEntry.time + ' Mins)'}</span></h4>
                          <p>{workEntry.date.displayDate}</p>
                          <p><i>{workEntry.summary}</i></p>
                        </div>
                        <div className="job-totals col-md-6">
                          <p>{'Subtotal: ' +'$'+ workEntry.financial.subTotal}</p>
                          <p>{'Tax: ' +'$'+ workEntry.financial.tax}</p>
                          <p>{'Total: ' +'$'+ workEntry.financial.total}</p>
                        </div>
                      </div>
                   </div>
          }, this)}
        </div>
      </div>
    )
  }
})

module.exports = Invoice;
