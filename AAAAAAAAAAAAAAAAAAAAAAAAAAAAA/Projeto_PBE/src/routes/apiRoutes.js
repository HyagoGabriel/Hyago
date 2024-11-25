const router = require("express").Router();

const controllerCadastro = require("../controllers/controllerCadastro");
const controllerSala = require("../controllers/controllerSala");
const reservaController = require('../controllers/reservaController');

// Rotas de Cadastro de Usuários
router.post("/cadastro", controllerCadastro.createUser); 
router.post("/login", controllerCadastro.loginUser); 
router.get("/cadastro", controllerCadastro.getAllUsers);    
router.put("/cadastro/:id", controllerCadastro.updateUser); 
router.delete("/cadastro/:id", controllerCadastro.deleteUser); 

// Rotas de Cadastro de Salas
router.post("/cadastroSala", controllerSala.createSala); 


router.get("/reserva", reservaController.createReservas); // http://localhost:5000/reservas/v1/reserva
router.post("/reserva", reservaController.createReservas); // http://localhost:5000/reservas/v1/reserva
router.get("/reservas", reservaController.getAllReservas); // http://localhost:5000/reservas/v1/reservas
router.put("/reserva/:id_reserva", reservaController.updateReserva); // http://localhost:5000/reservas/v1/reserva/id_reserva
router.delete("/reserva/:id_reserva", reservaController.deleteReserva); // http://localhost:5000/reservas/v1/reserva/id_reserva

// Informações adicionais da API
// Exemplo de URL base: http://localhost:5000/projeto_de_reserva/

module.exports = router;
