const Router = require('express');
const router = new Router();
const medicineProducerController = require('../controllers/medicine_producer.controllers');

router.post('/medicineProducers', medicineProducerController.createMedicineProducer)
router.get('/medicineProducers', medicineProducerController.getMedicineProducers)
router.get('/medicineProducers/:id', medicineProducerController.getOneMedicineProducer)
router.put('/medicineProducers/:id', medicineProducerController.updateMedicineProducer)
router.delete('medicineProducers/:id', medicineProducerController.deleteMedicineProducer)

module.exports = router;