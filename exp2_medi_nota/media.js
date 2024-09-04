const terminal = require('prompt-sync')();

let nota = parseFloat(terminal('Digite a nota: '));

if (nota >= 0 && nota < 4) {
    console.log('Aluno Reprovado!!!');
} else if (nota >= 4 && nota < 6) {
    console.log('Aluno Recuperação!!!');
} else if (nota >= 6 && nota <= 10) {
    console.log('Aluno Aprovado!!!');

}
