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


router.get("/reserva", reservaController.createReservas); 
router.post("/reserva", reservaController.createReservas); 
router.get("/reservas", reservaController.getAllReservas); 
router.put("/reserva/:id_reserva", reservaController.updateReserva); 
router.delete("/reserva/:id_reserva", reservaController.deleteReserva); 

// Informações adicionais da API
// Exemplo de URL base: http://localhost:5000/projeto_de_reserva/

module.exports = router;
