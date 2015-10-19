var React = require('react');

var NewJob = React.createClass({
  render: function () {
    return (
      <div className="new-job text-center col-md-6">
        <h3>New Job</h3>
        <div className="row">
          <div className="form-group form-group-lg col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="title">Title</label>
            <input id="title" placeholder="Payroll Processing" className="form-control text-center"></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group form-group-lg col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="hourly-rate">Hourly Rate</label>
            <input id="hourly-rate" placeholder="$10.00" className="form-control text-center"></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group form-group-lg col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="tax-rate">Tax Rate</label>
            <input id="tax-rate" placeholder="6.5%" className="form-control text-center"></input>
          </div>
        </div>
        <button className="btn btn-success">Create</button>
      </div>
    )
  }
})

module.exports = NewJob;
