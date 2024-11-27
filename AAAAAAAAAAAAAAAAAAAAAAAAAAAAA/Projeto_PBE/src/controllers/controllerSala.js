const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class SalaController {
  static createSala(req, res) {
    // Extrai os dados do corpo da requisição
    const { nome, descricao, bloco, tipo, capacidade } = req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !bloco || !tipo || !capacidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Query para inserir a sala no banco de dados
    const query = `INSERT INTO sala (nome, descricao, bloco, tipo, capacidade) VALUES (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, bloco, tipo, capacidade];

    connect.query(query, values, function (err) {
      if (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "O nome da sala já existe",
          });
        }
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      }
      return res.status(201).json({ message: "Sala criada com sucesso!" });
    });
  }

  static getAllSalas(req, res) {
    const query = `SELECT * FROM sala`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      }
      return res
        .status(200)
        .json({ message: "Obtendo todas as salas", salas: results });
    });
  }

  static updateSala(req, res) {
    const { nome, descricao, bloco, tipo, capacidade } = req.body;
    const salaId = req.params.id_sala;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !bloco || !tipo || !capacidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Query para atualizar os dados da sala
    const query = `UPDATE sala SET nome = ?, descricao = ?, bloco = ?, tipo = ?, capacidade = ? WHERE id_sala = ?`;
    const values = [nome, descricao, bloco, tipo, capacidade, salaId];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "O nome da sala já existe",
          });
        }
        return res.status(500).json({ error: "Erro interno no servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      return res
        .status(200)
        .json({ message: "Sala atualizada com sucesso" });
    });
  }

  static deleteSala(req, res) {
    const salaId = req.params.id_sala;
    const query = `DELETE FROM sala WHERE id_sala = ?`;
    const values = [salaId];

    connect.query(query, values, (err, results) => {
      if (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
          return res.status(400).json({
            error: "A sala está vinculada a uma reserva e não pode ser excluída",
          });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      return res.status(200).json({ message: "Sala excluída com sucesso" });
    });
  }
};
