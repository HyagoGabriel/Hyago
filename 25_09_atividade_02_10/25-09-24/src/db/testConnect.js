const connect = require("./connect");

module.exports = function testConnect() {
  try {
    const query = `SELECT 'Conexão bem-sucedida' AS Mensagem`;
    connect.query(query, function (err) {
      if (err) {
        console.log("Conexão nao realizada", err);
        return;
      }
      console.log("Conexao realizada com Mysql");
    });
  } catch(error){
    console.error("Erro a executar a consulta:", error);
  }
};
