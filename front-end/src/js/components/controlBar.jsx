var React = require('react');

var ControlBar = React.createClass({
  render: function () {
    return (
      <div className="control-bar row">
        <div className="create-work col-md-6">
          <button className="btn btn-primary" onClick={this.props.handlers.jobANDworkToggle.bind(this, true)}>Jobs</button>
          <button className="work-entry btn btn-primary" onClick={this.props.handlers.jobANDworkToggle.bind(this, false)}>Work Entry</button>
        </div>
        <div className="invoice col-md-6">
          <button className="btn btn-primary" onClick={this.props.saveInvoice}>Save</button>
          <button className="work-history btn btn-primary" onClick={this.props.handlers.invoiceToggle.bind(this, false)}>Work History</button>
        </div>
      </div>
    )
  }
})

module.exports = ControlBar;
