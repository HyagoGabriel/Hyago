module.exports = class controllerNumbers {
  static async checkPar(req, res) {
    const { numero } = req.body;

    if (numero % 2 === 0) {
      return res.status(200).json({ message: "Numero Par!!" });
    }
    return res.status(200).json({ message: "Numero Impar!!" });
  }

  static async checkPrimo(req, res) {
    const { numero } = req.body;

    if (numero <= 1) {
      return res.status(200).json({ message: "Nao é primo!!" });
    }

    for (let i = 2; i < numero; i++) {
      if (numero % i === 0) {
        return res.status(200).json({ message: "Nao é primo!!" });
      }
    }

    return res.status(200).json({ message: "é primo!!!" });
  }
};
