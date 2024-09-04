const terminal = require('prompt-sync')();

let celsius = parseFloat(terminal('Temperatu em celsius:'));

fahrenheit = ((celsius * 9/5) + 32);
console.log('Temperatura em fahrenheits:', fahrenheit, );