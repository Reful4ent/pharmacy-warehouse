const Router = require('express');
const router = new Router();
const userPermissionsController = require('../controllers/users_permissions.controller');

router.get('/permissions', userPermissionsController.getUsersPermissions)
router.post('/permissions', userPermissionsController.getOneUserPermissions)
router.put('/permissions', userPermissionsController.updateUserPermission)

module.exports = router;