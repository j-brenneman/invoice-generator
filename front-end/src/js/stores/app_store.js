var AppDispatcher = require('../dispatcher/app_dispatcher');
var appConstants = require('../constants/app_constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var serverCalls = require('../assets/serverCalls.js');
var UUID = require('pure-uuid');
var money = require('money-math');
var dateConversion = require('../assets/dateConversion.js');


var CHANGE_EVENT = 'change';

var appState = {
  customers: [],
  jobs: [],
  invoices: [],
  selectedCustomer: {},
  selectedInvoice: new Invoice(),
  jobANDworkToggle: true,
  invoiceToggle: true
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
  this.financial = workEntry.financial;
  this.customer = workEntry.customer;
  this._id = JSON.stringify(new UUID(1));
}

function Invoice() {
  this.workEntries = [];
  this.customer = {};
  this.grandTotal = '0.00';
  this.date = new Date();
  this._id = JSON.stringify(new UUID(1));
}

var workEntryCalculations = function (workEntry) {
  var subTotal = money.mul(workEntry.job.hourly, money.floatToAmount(workEntry.time/60));
  var tax = money.percent(subTotal, workEntry.job.tax);
  var total = money.add(subTotal, tax);
  return {
    subTotal: subTotal,
    tax: tax,
    total: total
  }
}

// Cutomer add/delete
var addCustomer = function (name) {
  var customer = new Customer(name);
  appState.customers.push(customer);
  appState.selectedCustomer = customer;
  appState.selectedInvoice = new Invoice();
  appState.selectedInvoice.customer  = customer;
  serverCalls.updateData(appState)
}

var selectCustomer = function (_id) {
  var customerSelect = (
    appState.customers.filter(function (customer) {
      if(_id === customer._id){
        return customer
      }
    })[0]
  );
  appState.selectedCustomer = customerSelect;
  appState.selectedInvoice = new Invoice();
  appState.selectedInvoice.customer = customerSelect;
  appState.invoiceToggle = true;
  serverCalls.updateData(appState);
}

// Job CRUD
var addJob = function (job) {
  appState.jobs.push(new Job(job));
  serverCalls.updateData(appState);
}

var editJob = function (data) {
  appState.jobs[data.index] = data.job;
  for (var i = 0; i <   appState.selectedInvoice.workEntries.length; i++) {
    if(appState.selectedInvoice.workEntries[i].job._id === data.job._id){
      var workEntry = appState.selectedInvoice.workEntries[i];
      workEntry.job = data.job;
      workEntry.financial = workEntryCalculations(workEntry);
      var grandTotal = '0.00';
      for (var i = 0; i < appState.selectedInvoice.workEntries.length; i++) {
        grandTotal = money.add(appState.selectedInvoice.workEntries[i].financial.total, grandTotal);
      }
      appState.selectedInvoice.grandTotal = grandTotal;
    }
  }
  serverCalls.updateData(appState)
}

var deleteJob = function (index) {
  appState.jobs.splice(index, 1);
  serverCalls.updateData(appState)
}

// Work Entry CRUD
var addWorkEntry = function (workEntry) {
  workEntry.job = appState.jobs.filter(function (job) {
    if(job._id === workEntry.job){
      return job;
    }
  })[0];
  workEntry.financial = workEntryCalculations(workEntry);
  appState.selectedInvoice.grandTotal = money.add(appState.selectedInvoice.grandTotal, workEntry.financial.total);
  var newWorkEntry = new WorkEntry(workEntry);
  appState.selectedInvoice.workEntries.push(newWorkEntry);
  serverCalls.updateData(appState)
}

var editWorkEntry = function (input) {
  var workEntry = appState.selectedInvoice.workEntries[input.index];
  workEntry.time = input.time;
  workEntry.summary = input.summary;
  workEntry.financial = workEntryCalculations(workEntry);
  var grandTotal = '0.00';
  for (var i = 0; i < appState.selectedInvoice.workEntries.length; i++) {
    grandTotal = money.add(appState.selectedInvoice.workEntries[i].financial.total, grandTotal);
  }
  appState.selectedInvoice.grandTotal = grandTotal;
  serverCalls.updateData(appState)
}

var deleteWorkEntry = function (index) {
  appState.selectedInvoice.workEntries.splice(index, 1);
  var grandTotal = '0.00';
  for (var i = 0; i < appState.selectedInvoice.workEntries.length; i++) {
    grandTotal = money.add(appState.selectedInvoice.workEntries[i].financial.total, grandTotal);
  }
  appState.selectedInvoice.grandTotal = grandTotal;
  serverCalls.updateData(appState)
}

// Invoice save/view/delete
var saveInvoice = function () {
  var date = new Date().toString().split(' ');
  appState.selectedInvoice.date = dateConversion[date[1]][1] +' '+ date[2] +', '+ date[3];
  appState.invoices.push(appState.selectedInvoice)
  appState.invoiceToggle = false;
  serverCalls.updateData(appState)
}

var selectInvoice = function (index) {
  appState.selectedInvoice = appState.invoices[index];
  appState.invoiceToggle = true;
  serverCalls.updateData(appState)
}

var newInvoice = function () {
  appState.selectedInvoice = new Invoice();
  appState.selectedInvoice.customer = appState.selectedCustomer;
  appState.invoiceToggle = true;
  serverCalls.updateData(appState)
}

// Toggle States
var toggleJobANDwork = function (boolean) {
  appState.jobANDworkToggle = boolean;
}

var invoiceToggle = function (boolean) {
  appState.invoiceToggle = boolean;
}

// InitialData
var initialData = function (data) {
  appState = data;
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
  },
  setInitialAppState: function () {
    return serverCalls.initialData(appState)
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
    case appConstants.EDIT_WORK_ENTRY:
      editWorkEntry(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.DELETE_WORK_ENTRY:
      deleteWorkEntry(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.INITIAL_DATA:
      initialData(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SAVE_INVOICE:
      saveInvoice();
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SELECT_INVOICE:
      selectInvoice(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.NEW_INVOICE:
      newInvoice();
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.JOB_AND_WORK_TOGGLE:
      toggleJobANDwork(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appConstants.INVOICE_TOGGLE:
      invoiceToggle(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = appStore;
