var React = require('react');

var Invoice = React.createClass({

  calculations: function () {
    var jobTotals = this.props.current.workEntries.map(function (workEntry) {
      var hourly = workEntry.job.hourly.replace('.', '') + '0';
      var tax = workEntry.job.tax.replace('.', '') + '0';
      console.log(parseInt(hourly), parseInt(tax));
      var subTotal = (parseInt(hourly) * parseInt(workEntry.time))/60;
      var total = (subTotal + (subTotal * parseInt(tax)))/100
      return {
        subTotal: subTotal/100,
        tax: (subTotal * parseInt(tax))/100,
        total: total
      }
    })
    console.log(jobTotals);
  },
  render: function () {
    return (
      <div className="invoiceView">
        <div className="text-center invoiceHeading">
          <h3>Invoice</h3>
          <span>{this.props.current.customer.name}</span>
        </div>
        <div className="invoice-jobs-view row">
          <h4>{Object.keys(this.props.current.jobs).length > 1 ? 'Jobs' : 'Job'}</h4>
          {this.props.current.workEntries.map(function (workEntry) {
            return <div className="invoice-work-entry" onClick={this.calculations}>
                      <p>{workEntry.job.title +' '+ workEntry.date.displayDate}</p>
                      <p><i>{workEntry.summary}</i></p>
                   </div>
          }, this)}
        </div>
      </div>
    )
  }
})

module.exports = Invoice;
