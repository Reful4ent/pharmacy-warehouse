const Router = require('express');
const router = new Router();
const statementController = require('../controllers/statement.controller');

router.post('/statements', statementController.createStatement)
router.get('/statements', statementController.getStatements)
router.get('/statements/:id', statementController.getOneStatement)
router.put('/statements/:id', statementController.updateStatement)
router.delete('statements/:id', statementController.deleteStatement)

module.exports = router;