const Router = require('express');
const router = new Router();
const customController = require('../controllers/custom.controller');

router.post('/customQuery', customController.getCustomQuery);

module.exports = router;