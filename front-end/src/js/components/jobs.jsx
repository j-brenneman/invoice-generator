var React = require('react');
var format = require('../assets/numberFormat.js');

var Jobs = React.createClass({

  getInitialState: function () {
    return {editIndex: null}
  },
  handleEditClick: function (e) {
    this.setState({
      editIndex: e.target.getAttribute('data-index')
    })
  },
  editJob: function (e) {
    var data = document.getElementsByClassName('edit-submit');
    var job = {
      title: data[0].value,
      hourly: format.hourly(data[1].value),
      tax: format.tax(data[2].value),
      customer: this.props.selectedCustomer,
      _id: document.getElementById('edit-job').getAttribute('data-id')
    };
    this.props.handlers.editJob({index: e.target.getAttribute('data-index'), job: job});
    this.setState({editIndex: null});
  },
  deleteJob: function (e) {
    this.props.handlers.deleteJob(e.target.getAttribute('data-index'));
    this.setState({editIndex: null});
  },
  render: function () {
    return (
      <div className="jobs">
        <table className="jobs-info table table-bordered">
          <thead>
            <th>Title</th><th>Hourly Rate</th><th>Tax Rate</th><th>Edit</th>
          </thead>
          <tbody>
            {this.props.jobs.map(function (job, i) {
              return (
                this.state.editIndex == i
                ? <tr className="edit-job" key={job._id +'edit'+ i}>
                    <td><input className="edit-submit" defaultValue={job.title}></input></td><td><input className="edit-submit" defaultValue={job.hourly}></input></td>
                    <td><input className="edit-submit" defaultValue={job.tax}></input></td>
                    <td>
                      <span id="edit-job" className="check-button fa fa-check" data-index={i} data-id={job._id} onClick={this.editJob}></span>
                      <span className="minus-button fa fa-minus" data-index={i} onClick={this.deleteJob}></span>
                    </td>
                  </tr>
                : <tr key={job._id + i}>
                    <td>{job.title}</td><td>{'$' + job.hourly}</td><td>{job.tax + '%'}</td>
                    <td><span data-index={i} onClick={this.handleEditClick} className={this.state.editIndex ? null : "edit-button"+" fa fa-pencil-square-o"}></span></td>
                  </tr>
              )
            }, this)}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = Jobs;
