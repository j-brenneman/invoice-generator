var React = require('react');
var monthConversion = require('../assets/dateConversion');

var NewWorkEntry = React.createClass({

  getInitialState: function () {
    var date = new Date().toString().split(' ')
    return {
      displayDate: monthConversion[date[1]][1] +' '+ date[2] +', '+ date[3],
      timeStamp: date
    }
  },
  handleNewWork: function () {
    var data = document.getElementsByClassName('newWork');
    var submitButton = document.getElementById('newWorkSubmit');
    var workEntry = {
      date: this.state,
      time: data[1].value,
      summary: data[2].value,
      job: data[0].options[data[0].selectedIndex].getAttribute('data-id'),
      customer: this.props.stateData.selectedCustomer
    };
    console.log(workEntry);
    this.props.handlers.addWorkEntry(workEntry);
    data[0].selectedIndex = -1;
    data[1].value = null;
    data[2].value = null;
    // submitButton.classList.add('disabled');
  },
  render: function () {
    return (
      <div className="work-entry">
        <h3>New Work Entry</h3>
        <div className="entry-date row">
          <h4><span className="label label-default">{this.state.displayDate}</span></h4>
        </div>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="job-type">Job</label>
            <select multiple className="job-list newWork form-control">
              {this.props.stateData.jobs.map(function (job, i) {
                return <option key={job._id + i} data-id={job._id}>{job.title +' '+ job.hourly +'/hr'}</option>
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="work-time">Work Time in Minutes</label>
            <input id="work-time" placeholder="10" className="newWork form-control text-center"></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-6 col-xs-offset-3">
            <label className="control-label" htmlFor="work-summary">Summary of Work</label>
            <textarea id="work-summary" className="newWork form-control text-center"></textarea>
          </div>
        </div>
        <button id="newWorkSubmit" className="btn btn-success" onClick={this.handleNewWork}>Create</button>
      </div>
    )
  }
})

module.exports = NewWorkEntry;
