var AppDispatcher = require('../dispatcher/app_dispatcher');
var appConstants = require('../constants/app_constants');

var appActions = {
  addCustomer: function (name) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.ADD_CUSTOMER,
      data: name
    })
  },
  selectCustomer: function (_id) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.SELECT_CUSTOMER,
      data: _id
    })
  },
  addJob: function (job) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.ADD_JOB,
      data: job
    })
  },
  editJob: function (data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.EDIT_JOB,
      data: data
    })
  },
  deleteJob: function (index) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.DELETE_JOB,
      data: index
    })
  }
}

module.exports = appActions;
