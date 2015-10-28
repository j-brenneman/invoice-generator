var money = require('money-math');

var hourlyFormat = function (input) {
  var hourly = input.replace('$', '');
  var hourlyAdjust = (hourly.length -1) - hourly.indexOf('.');
  if(hourly.indexOf('.') === -1){
    hourly += '.00'
  } else if(hourlyAdjust == 1){
    hourly += '0';
  } else if(hourlyAdjust > 2){
    hourly = money.floatToAmount(Number(hourly));
  } else {
    hourly = hourly;
  }
  return hourly;
}

var taxFormat = function (input) {
  var tax = input.replace('%', '');
  var taxAdjust = (tax.length -1) - tax.indexOf('.');
  if(tax.indexOf('.') === -1){
    tax += '.00'
  } else if(taxAdjust == 1){
    tax += '0';
  } else if(taxAdjust > 2){
    tax = money.floatToAmount(Number(tax));
  } else {
    tax = tax;
  }
  return tax;
}

module.exports = {
  hourly: hourlyFormat,
  tax: taxFormat
}
