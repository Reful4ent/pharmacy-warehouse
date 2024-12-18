const Router = require('express');
const router = new Router();
const medicineController = require('../controllers/medicine.controller');

router.post('/medicines/create', medicineController.createMedicine)
router.post('/medicines', medicineController.getMedicines)
router.get('/medicines/:id', medicineController.getOneMedicine)
router.put('/medicines/:id', medicineController.updateMedicine)
router.delete('/medicines/:id', medicineController.deleteMedicine)

module.exports = router;