var React = require('react');
var validations = require('../assets/validations.js');
var format = require('../assets/numberFormat.js');

var NewJob = React.createClass({

  handleNewJob: function () {
    var data = document.getElementsByClassName('newJob');
    var submitButton = document.getElementById('newJobSubmit');
    var job = {
      title: data[0].value,
      hourly: format.hourly(data[1].value),
      tax: format.tax(data[2].value),
      customer: this.props.selectedCustomer
    };
    this.props.handlers.addJob(job);
    for (var i = 0; i < data.length; i++) {
      data[i].value = null;
      data[i].parentNode.classList.remove('has-success');
    }
    submitButton.classList.add('disabled');
  },
  inputHandlers: validations,
  render: function () {
    return (
      <div>
        <h3>New Job</h3>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="title">Title</label>
            <input id="title" placeholder="Payroll Processing" className="newJob form-control text-center" onInput={this.inputHandlers.titleValidation.bind(this)}></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="hourly-rate">Hourly Rate</label>
            <input id="hourly-rate" placeholder="$10.00" className="newJob form-control text-center" onInput={this.inputHandlers.hourlyValidation.bind(this)}></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="tax-rate">Tax Rate</label>
            <input id="tax-rate" placeholder="6.5%" className="newJob form-control text-center" onInput={this.inputHandlers.taxValidation.bind(this)}></input>
          </div>
        </div>
        <button id="newJobSubmit" className="btn btn-success disabled" onClick={this.handleNewJob}>Create</button>
      </div>
    )
  }
})

module.exports = NewJob;
