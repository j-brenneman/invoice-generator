var React = require('react');
var appStore = require('../stores/app_store');
var appActions = require('../actions/app_actions');

// Child Componets
var SideBar = require('./sidebar.jsx');
var NavBar = require('./navBar.jsx');
var ControlBar = require('./controlBar.jsx');
var Jobs = require('./jobs.jsx');
var NewJob = require('./newJob.jsx');
var NewWorkEntry = require('./newWorkEntry.jsx');
var WorkEntries = require('./workEntries.jsx');
var Invoice = require('./invoice.jsx');


var App = React.createClass({

  getInitialState:function () {
    return appStore.getCurrentState();
  },
  componentWillMount: function () {
    appStore.setInitialAppState()
    .then(function (data) {
      appActions.initialData(data);
    })
  },
  componentDidMount: function () {
    appStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState(appStore.getCurrentState());
  },
  sideBarHandlers: {
    addCustomer: function (name) {
      appActions.addCustomer(name);
    },
    selectCustomer: function (_id) {
      appActions.selectCustomer(_id);
    }
  },
  jobHandlers: {
    addJob: function (job) {
      appActions.addJob(job);
    },
    editJob: function (data) {
      appActions.editJob(data);
    },
    deleteJob: function (index) {
      appActions.deleteJob(index);
    }
  },
  workEntryHandlers: {
    addWorkEntry: function (workEntry) {
      appActions.addWorkEntry(workEntry);
    },
    editWorkEntry: function (input) {
      appActions.editWorkEntry(input);
    },
    deleteWorkEntry: function (index) {
      appActions.deleteWorkEntry(index);
    }
  },
  toggle: {
    jobANDworkToggle: function (boolean) {
      appActions.jobANDworkToggle(boolean);
    }
  },
  render: function () {
    return (
      <div>
        <SideBar customers={this.state.customers} handlers={this.sideBarHandlers} />
        <div className="invoice-manager">
          <NavBar selectedCustomer={this.state.selectedCustomer} />
          <ControlBar handlers={this.toggle} />
          <div className="new-job text-center col-md-6">
            {this.state.jobANDworkToggle
             ? <div>
                <NewJob handlers={this.jobHandlers} selectedCustomer={this.state.selectedCustomer} />
                <Jobs handlers={this.jobHandlers} jobs={this.state.jobs} selectedCustomer={this.state.selectedCustomer} />
               </div>
             : <div>
                <NewWorkEntry stateData={this.state} handlers={this.workEntryHandlers}/>
                <WorkEntries handlers={this.workEntryHandlers} workEntries={this.state.workEntries} jobs={this.state.jobs} selectedInvoice={this.state.selectedInvoice} selectedCustomer={this.state.selectedCustomer} />
               </div>
            }
          </div>
          <div className="col-md-6">
            <Invoice current={this.state.selectedInvoice} />
          </div>
        </div>
      </div>
    )
  }

})

React.render(<App />, document.getElementById('app'));
