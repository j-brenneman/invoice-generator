var React = require('react');

var WorkEntries = React.createClass({

  getInitialState: function () {
    return {editIndex: null}
  },
  handleEditClick: function (e) {
    this.setState({
      editIndex: e.target.getAttribute('data-index')
    })
  },
  getCustomerWorkEntries: function () {
    return this.props.workEntries.filter(function (workEntry) {
      if(workEntry.customer._id === this.props.selectedCustomer._id){
        return workEntry.job = this.props.jobs.filter(function (job) {
          if(job._id === workEntry.job){
            return job;
          }
        })[0]
      }
    }, this)

  },
  render: function () {
    return (
      <div className="work-entries">
        <table className="table table-bordered">
          <thead>
            <th>Date</th><th>Job</th><th>Work Time</th><th>Edit</th>
          </thead>
          <tbody>
            {this.getCustomerWorkEntries().map(function (workEntry, i) {
              return (
                <tr key={workEntry._id + i}>
                  <td>{workEntry.date.displayDate}</td><td>{workEntry.job.title}</td><td>{workEntry.summary}</td>
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

module.exports = WorkEntries;
