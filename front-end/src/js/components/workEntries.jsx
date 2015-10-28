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
  editEntry: function (e) {
    var data = document.getElementsByClassName('edit-entry');
    var workEntry = {
      time: data[0].value,
      summary: data[1].value,
      index: e.target.getAttribute('data-index')
    }
    this.props.handlers.editWorkEntry(workEntry);
    this.setState({editIndex: null});
  },
  deleteEntry: function (e) {
    this.props.handlers.deleteWorkEntry(e.target.getAttribute('data-index'));
    this.setState({editIndex: null});
  },
  render: function () {
    return (
      <div className="work-entries">
        <table className="entry-info table table-bordered">
          <thead>
            <th>Date</th><th>Job</th><th>Work Time</th><th>Summary</th><th>Edit</th>
          </thead>
          <tbody>
            {this.props.selectedInvoice.workEntries.map(function (workEntry, i) {
              return (
                this.state.editIndex == i
                ? <tr key={workEntry._id +'edit'+ i}>
                    <td>{workEntry.date.displayDate}</td><td>{workEntry.job.title}</td>
                    <td><input className="edit-entry" defaultValue={workEntry.time}></input></td>
                    <td><textarea className="edit-entry form-control text-center" defaultValue={workEntry.summary}></textarea></td>
                    <td>
                      <span className="check-button fa fa-check" data-index={i} onClick={this.editEntry}></span>
                      <span className="minus-button fa fa-minus" data-index={i} onClick={this.deleteEntry}></span>
                    </td>
                  </tr>
                : <tr key={workEntry._id + i}>
                    <td>{workEntry.date.displayDate}</td><td>{workEntry.job.title}</td><td>{workEntry.time + ' Minutes'}</td><td>{workEntry.summary}</td>
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
