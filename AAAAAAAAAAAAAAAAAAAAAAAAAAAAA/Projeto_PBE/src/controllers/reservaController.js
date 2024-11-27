const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class AgendamentoController {
  
  // Função para criar novas reservas
  static createReservas(req, res) {
    // Extrai os dados do corpo da requisição
    const { fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim } = req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!fk_id_usuario || !fk_id_sala || !datahora_inicio || !datahora_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Verifica se o usuário existe no banco de dados
    const queryUsuario = `SELECT * FROM usuario WHERE id_usuario = ?`;
    const valuesUsuario = [fk_id_usuario];

    // Verifica se a sala existe no banco de dados
    const querySala = `SELECT * FROM sala WHERE id_sala = ?`;
    const valuesSala = [fk_id_sala];

    // Verifica se já existe uma reserva que se sobreponha no mesmo horário para a mesma sala
    const queryHorario = `SELECT datahora_inicio, datahora_fim FROM reserva WHERE fk_id_sala = ? AND (
        (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (datahora_inicio >= ? AND datahora_inicio < ?) OR  -- Novo horário começa dentro de um horário já reservado
        (datahora_fim > ? AND datahora_fim <= ?) -- Novo horário termina dentro de um horário já reservado
      )`;

    const valuesHorario = [
      fk_id_sala,
      datahora_inicio,
      datahora_inicio,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
    ];

    // Verifica se já há algum agendamento conflitante
    connect.query(queryHorario, valuesHorario, (err, resultadosH) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar horário" });
      }

      // Verifica se o usuário existe
      connect.query(queryUsuario, valuesUsuario, (err, resultadosU) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao buscar usuário" });
        }

        // Verifica se a sala existe
        connect.query(querySala, valuesSala, (err, resultadosS) => {
          if (err) {
            return res.status(500).json({ error: "Erro ao buscar sala" });
          }

          // Se o usuário não for encontrado
          if (resultadosU.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
          }

          // Se a sala não for encontrada
          if (resultadosS.length === 0) {
            return res.status(404).json({ error: "Sala não encontrada" });
          }

          // Valida se a data de término é posterior à data de início
          if (new Date(datahora_fim).getTime() < new Date(datahora_inicio).getTime()) {
            return res.status(400).json({ error: "Data ou Hora da Inválida" });
          }

          // Valida se a data de término é igual à data de início (impossível de acontecer)
          if (new Date(datahora_fim).getTime() === new Date(datahora_inicio).getTime()) {
            return res.status(400).json({ error: "Data ou Hora da Inválida" });
          }

          const limiteHora = 60 * 60 * 1000; // 1 hora em milissegundos
          // Valida se a reserva ultrapassa o limite de 1 hora
          if (new Date(datahora_fim) - new Date(datahora_inicio) > limiteHora) {
            return res
              .status(400)
              .json({ error: "O tempo de Reserva excede o limite (1h)" });
          }

          // Se houver qualquer reserva que se sobreponha, retorna erro
          if (resultadosH.length > 0) {
            return res
              .status(400)
              .json({
                error: "A sala escolhida já está reservada neste horário",
              });
          }

          // Realiza o agendamento, inserindo a nova reserva no banco de dados
          const queryInsert = `INSERT INTO reserva (fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim)
                              VALUES (?, ?, ?, ?)`;
          const valuesInsert = [
            fk_id_usuario,
            fk_id_sala,
            datahora_inicio,
            datahora_fim,
          ];

          // Inserção no banco de dados
          connect.query(queryInsert, valuesInsert, (err, results) => {
            if (err) {
              return res.status(500).json({ error: "Erro ao criar reserva" });
            }

            // Retorna sucesso ao criar a reserva
            return res
              .status(201)
              .json({ message: "Sala reservada com sucesso!" });
          });
        });
      });
    });
  }

  // Função para obter todas as reservas
  static getAllReservas(req, res) {
    const query = `SELECT * FROM reserva`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      }
      // Retorna todas as reservas
      return res
        .status(200)
        .json({ message: "Obtendo todas as reservas", reservas: results });
    });
  }

  // Função para atualizar uma reserva existente
  static updateReserva(req, res) {
    const { datahora_inicio, datahora_fim } = req.body;
    const reservaId = req.params.id_reserva;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!datahora_inicio || !datahora_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Verifica se já existe um conflito de horários para a reserva
    const queryHorario = `SELECT datahora_inicio, datahora_fim FROM reserva WHERE id_reserva = ? AND (
      (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
      (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
      (datahora_inicio >= ? AND datahora_inicio < ?) OR  -- Novo horário começa dentro de um horário já reservado
      (datahora_fim > ? AND datahora_fim <= ?) -- Novo horário termina dentro de um horário já reservado
    )`;

    const valuesHorario = [
      reservaId,
      datahora_inicio,
      datahora_inicio,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
    ];

    // Query para atualizar os dados da reserva
    const queryUpdate = `UPDATE reserva SET datahora_inicio = ?, datahora_fim = ? WHERE id_reserva = ?`;
    const valuesUpdate = [datahora_inicio, datahora_fim, reservaId];

    connect.query(queryHorario, valuesHorario, (err, resultadosH) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar horário" });
      }

      // Valida se a data de término é posterior à data de início
      if (new Date(datahora_fim) < new Date(datahora_inicio)) {
        return res.status(400).json({ error: "Data ou Hora da Inválida" });
      }

      const limiteHora = 60 * 60 * 1000; // 1 hora em milissegundos
      // Valida se o tempo de reserva excede o limite de 1 hora
      if (new Date(datahora_fim) - new Date(datahora_inicio) > limiteHora) {
        return res
          .status(400)
          .json({ error: "O tempo de Reserva excede o limite (1h)" });
      }

      // Se houver algum conflito de horários, retorna erro
      if (resultadosH.length > 0) {
        return res
          .status(400)
          .json({ error: "A sala escolhida já está reservada neste horário" });
      }

      // Realiza a atualização da reserva
      connect.query(queryUpdate, valuesUpdate, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao atualizar reserva" });
        }

        // Retorna sucesso ao atualizar a reserva
        return res
          .status(201)
          .json({ message: "Sala atualizada com sucesso!" });
      });
    });
  }

  // Função para excluir uma reserva
  static deleteReserva(req, res) {
    const reservaId = req.params.id_reserva;
    const query = `DELETE FROM reserva WHERE id_reserva = ?`;
    const values = [reservaId];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }

      // Verifica se a reserva foi excluída
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Reserva não encontrada" });
      }
      // Retorna sucesso ao excluir a reserva
      return res.status(200).json({ message: "Reserva excluída com sucesso" });
    });
  }
};
