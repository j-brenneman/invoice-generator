var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgresql://localhost/postgres');

var ApplicationState = sequelize.define('ApplicationState', {
  data: Sequelize.JSON
});

ApplicationState.sync();

var updateAppState = function (data) {
  return ApplicationState.findById(1)
  .then(function (result) {
    return result.update({data: data})
    .then(function () {
      return 'success!'
    })
  })
}

var createORreturn = function (data) {
  return ApplicationState.findById(1)
  .then(function (result) {
    if(result != null){
      console.log('were hereeee');
      return Promise.resolve({result: 'updated', data: result})
    } else {
      return ApplicationState.create({data: data})
      .then(function () {
        return Promise.resolve({result: 'created'})
      })
    }
  })
}

module.exports = {
  createORreturn: createORreturn,
  updateAppState: updateAppState
};
