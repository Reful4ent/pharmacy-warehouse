const Router = require('express')
const router = new Router();
const producerController = require('../controllers/producer.controller');

router.post('/producers/create', producerController.createProducer)
router.post('/producers', producerController.getProducers)
router.get('/producers/:id', producerController.getOneProducer)
router.put('/producers/:id', producerController.updateProducer)
router.delete('/producers/:id', producerController.deleteProducer)

module.exports = router;