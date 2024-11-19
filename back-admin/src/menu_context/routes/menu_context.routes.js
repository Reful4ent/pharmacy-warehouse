const Router = require('express');
const router = new Router();
const menuContextController = require('../controllers/menu_context.controller');

router.get('/menuContexts', menuContextController.getMenuContexts);

module.exports = router;