const Router = require('express');
const router = new Router();
const filesController = require('../controllers/files.controller');

router.get('/word/create/:name', filesController.createWord)
router.get('/excel/create/:name', filesController.createExcel)

module.exports = router;