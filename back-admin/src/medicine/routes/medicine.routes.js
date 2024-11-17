const Router = require('express');
const router = new Router();
const medicineController = require('../controllers/medicine.controller');

router.post('/medicines', medicineController.createMedicine)
router.get('/medicines', medicineController.getMedicines)
router.get('/medicines/:id', medicineController.getOneMedicine)
router.put('/medicines/:id', medicineController.updateMedicine)
router.delete('medicines/:id', medicineController.deleteMedicine)

module.exports = router;