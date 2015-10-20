var AppDispatcher = require('../dispatcher/app_dispatcher');
var appConstants = require('../constants/app_constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var UUID = require('pure-uuid');


var CHANGE_EVENT = 'change';

var appState = {
  customers: [],
  jobs: [],
  invoices: [],
  selectedCustomer: {}
};

function NewCustomer(name) {
  this.name = name;
  this._id = JSON.stringify(new UUID(1));
}

function NewJob(job) {
  this.title = job.title;
  this.hourly = job.hourly;
  this.tax = job.tax;
  this.customer = job.customer;
  this._id = JSON.stringify(new UUID(1));
}

var addCustomer = function (name) {
  var customer = new NewCustomer(name);
  appState.customers.push(customer);
  appState.selectedCustomer = customer;
}

var selectCustomer = function (_id) {
  appState.selectedCustomer = (
    appState.customers.filter(function (customer) {
      if(_id === customer._id){
        return customer
      }
    })[0]);
}

var addJob = function (job) {
  appState.jobs.push(new NewJob(job));
}

var editJob = function (data) {
  appState.jobs[data.index] = data.job;
}

var deleteJob = function (index) {
  appState.jobs.splice(index, 1);
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
    default:
      return true;
  }
});

module.exports = appStore;
