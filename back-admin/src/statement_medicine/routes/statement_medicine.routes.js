const Router = require('express');
const router = new Router();
const statementMedicineController = require('../controllers/statement_medicine.controller');

router.post('/statementMedicines', statementMedicineController.createStatementMedicine)
router.get('/statementMedicines', statementMedicineController.getStatementMedicines)
router.get('/statementMedicines/:id', statementMedicineController.getOneStatementMedicine)
router.put('/statementMedicines/:id', statementMedicineController.updateStatementMedicine)
router.delete('statementMedicines/:id', statementMedicineController.deleteStatementMedicine)

module.exports = router;