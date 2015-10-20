var validated = {
  title: null,
  hourly: null,
  tax: null
}

var inputValidation = function (validate) {
  if(validated[validate] == null){
    validated[validate] = true;
  }
  var submitButton = document.getElementById('newJobSubmit');
  if(validated.title && validated.hourly && validated.tax){
    submitButton.classList.remove('disabled');
  }
}

var validations= {
  titleValidation: function (e) {
    if(e.target.value){
      e.target.parentNode.classList.add('has-success')
      inputValidation('title')
    } else {
    inputValidation();
    }
  },
  hourlyValidation: function (e) {
    var num = e.target.value.replace('$', '');
    if(e.target.value && typeof parseInt(num) == 'number' && parseInt(num) % 1 == 0){
      e.target.parentNode.classList.add('has-success')
      inputValidation('hourly')
    } else {
      inputValidation();
    }
  },
  taxValidation: function (e) {
    var num = e.target.value.replace('%', '');
    if(e.target.value && typeof parseInt(num) == 'number' && parseInt(num) % 1 == 0){
      e.target.parentNode.classList.add('has-success')
      inputValidation('tax')
    } else {
      inputValidation();
    }
  }
}

module.exports = validations;
