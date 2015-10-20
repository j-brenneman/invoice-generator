var React = require('react');

var ControlBar = React.createClass({
  render: function () {
    return (
      <div className="control-bar row">
        <div className="create-work col-md-6">
          <button className="btn btn-primary">Jobs</button>
          <button className="work-entry btn btn-primary">Work Entry</button>
        </div>
        <div className="invoice col-md-6">
          <button className="btn btn-primary">Save</button>
          <button className="work-history btn btn-primary">Work History</button>
        </div>
      </div>
    )
  }
})

module.exports = ControlBar;
