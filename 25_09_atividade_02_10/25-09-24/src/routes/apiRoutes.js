const router = require('express').Router()

const userController = require("../controllers/userController")
const organizadorController = require("../controllers/organizadorController")

router.post('/user',userController.createUser);
router.get('/user', userController.getAllUsers);
router.put('/user', userController.updateUser);
router.delete('/user/:cpf', userController.deleteUser);

router.post('/org',organizadorController.createOrg);
router.get('/org', organizadorController.getAllOrgs);
router.put('/org', organizadorController.updateOrg);
router.delete('/org/:id_org', organizadorController.deleteOrg);

module.exports = router