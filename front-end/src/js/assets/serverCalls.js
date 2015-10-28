var $ = require('jquery');

var serverCalls = {
  initialData: function (data) {
    return $.post('/api/initial', {data: JSON.stringify(data)})
    .then(function (res) {
      if(res.body.result === 'created'){
        return data
      } else {
        return res.body.data.data
      }
    })
  },
  updateData: function (data) {
    return $.post('/api/update', {data: JSON.stringify(data)})
    .then(function (res) {
      console.log(res.body);
    })
  }
}

module.exports = serverCalls;
