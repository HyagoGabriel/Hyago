const { response } = require("..");

function numPrimo(primo){
  if (primo <= 1) return false; // Números menores ou iguais a 1 não são primos
    if (primo <= 3) return true;  // 2 e 3 são primos


    if (primo % 2 === 0 || primo % 3 === 0) return false;     // Se o número é divisível por 2 ou 3, não é primo

    
    for (let i = 5; i * i <= primo; i += 6) { // Verifica os números a partir de 5 até a raiz quadrada do número
        if (primo % i === 0 || primo % (i + 2) === 0) return false;
    }

    return true;
}//fim primo

function numPar(par){
  return par % 2 === 0;
}//fim par


module.exports = class controllerNumbers {
    //Cadastro professor
  static async postPar(req, res) {
    const { number } = req.body;
    if (typeof number !== "number") {
      res.status(400).json({ message: "Digite um number" });
    }
    else{
      if(numPar(number)){
        res.status(200).json({message: "Número par!"});
      }
      else{
        res.status(200).json({message: "Número impar!"});
      }
    } 
  }// fim par
  static async postPrimo(req, res) {
    const { number } = req.body;
    if (typeof number !== "number") {
      res.status(400).json({ message: "Digite um number" });
    }
    else{
      if(numPrimo(number)){
        res.status(200).json({message: "Número é primo!"});
      }
      else{
        res.status(200).json({message: "Número nao é primo!"});
      }
    } 
  }//fim primos


  //lista os Professor
  static async getNumbers(req, res){
    res.status(200).json({nome:"number"})
  }
};