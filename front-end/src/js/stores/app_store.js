var AppDispatcher = require('../dispatcher/app_dispatcher');
var appConstants = require('../constants/app_constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var UUID = require('pure-uuid');


var CHANGE_EVENT = 'change';

var appState = {
  customers: [],
  jobs: [],
  workEntries: [],
  invoices: [],
  selectedCustomer: {},
  selectedInvoice: new Invoice(),
  jobANDworkToggle: true
};

function Customer(name) {
  this.name = name;
  this._id = JSON.stringify(new UUID(1));
  this.workEntries = [];
}

function Job(job) {
  this.title = job.title;
  this.hourly = job.hourly;
  this.tax = job.tax;
  this.customer = job.customer;
  this._id = JSON.stringify(new UUID(1));
}

function WorkEntry(workEntry) {
  this.date = workEntry.date;
  this.time = workEntry.time;
  this.summary = workEntry.summary;
  this.job = workEntry.job;
  this.customer = workEntry.customer;
  this._id = JSON.stringify(new UUID(1));
}

function Invoice() {
  this.jobs = {};
  this.workEntries = [];
  this.customer = {};
}

Invoice.prototype.findCustomerWork = function (workEntry) {
  for (var j = 0; j < appState.jobs.length; j++) {
    if(appState.jobs[j]._id === workEntry.job){
      workEntry.job = appState.jobs[j];
      this.workEntries.push(workEntry);
    }
  }
}

// Cutomer add/delete
var addCustomer = function (name) {
  var customer = new Customer(name);
  appState.customers.push(customer);
  appState.selectedCustomer = customer;
  appState.selectedInvoice = new Invoice();
  appState.selectedInvoice.customer  = customer;  
}

var selectCustomer = function (_id) {
  var customerSelect = (
    appState.customers.filter(function (customer) {
      if(_id === customer._id){
        return customer
      }
    })[0]);
    appState.selectedCustomer = customerSelect;
    appState.selectedInvoice;
}

// Job CRUD
var addJob = function (job) {
  appState.jobs.push(new Job(job));
}

var editJob = function (data) {
  appState.jobs[data.index] = data.job;
}

var deleteJob = function (index) {
  appState.jobs.splice(index, 1);
}

// Work Entry CRUD
var addWorkEntry = function (workEntry) {
  var newWorkEntry = new WorkEntry(workEntry);
  appState.workEntries.push(newWorkEntry);
  var associatedJob = (
    appState.jobs.filter(function (job) {
    if(job._id === newWorkEntry.job){
      return job
    }
  })[0])
  appState.selectedInvoice.jobs[associatedJob._id] = associatedJob;
  appState.selectedInvoice.findCustomerWork(newWorkEntry);
}

// Toggle States
var toggleJobANDwork = function (boolean) {
  appState.jobANDworkToggle = boolean;
}

var appStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function (cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getCurrentState: function () {
    return appState;
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_CUSTOMER:
      addCustomer(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SELECT_CUSTOMER:
      selectCustomer(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.ADD_JOB:
      addJob(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.EDIT_JOB:
      editJob(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.DELETE_JOB:
      deleteJob(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.ADD_WORK_ENRTY:
      addWorkEntry(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.JOB_AND_WORK_TOGGLE:
      toggleJobANDwork(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = appStore;
