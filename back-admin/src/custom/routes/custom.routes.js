const Router = require('express');
const router = new Router();
const customController = require('../controllers/custom.controller');

router.get('/customQuery', customController.getCustomQuery);

module.exports = router;