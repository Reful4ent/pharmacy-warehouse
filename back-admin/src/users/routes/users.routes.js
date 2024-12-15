const Router = require('express');
const router = new Router();
const usersController = require('../controllers/users.controller');

router.post('/users/register', usersController.createUser)
router.post('/users', usersController.getUsers)
router.post('/users/login', usersController.getOneUser)
router.put('/users/change-password', usersController.updateUser)
router.delete('/users/:id', usersController.deleteUser)

module.exports = router;