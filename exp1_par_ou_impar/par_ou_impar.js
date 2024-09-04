const terminal = require('prompt-sync')();

let num1 = parseFloat(terminal("Digite um valor: "));

 if(num1 % 2 === 0 ){
    console.log('O numero', num1, 'é par');
 }

if(num1 % 2 == 1){
    console.log('O numero', num1, 'é impar');
}



