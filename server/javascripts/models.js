var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgresql://localhost/postgres');

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

  

var a = User.findAll().then(function (users) {
  console.log(users);
})




module.exports = a;
