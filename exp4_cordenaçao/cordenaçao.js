const terminal = require('prompt-sync')();

let tamanho = parseFloat(terminal('Digite o tamanho da lista '));
let lista = [];

for (let i = 0; i < tamanho; i++){
let numeros = parseFloat(terminal('Digite os numeros da lista '));
lista.push(numeros);

}

console.log('lista ', lista, );