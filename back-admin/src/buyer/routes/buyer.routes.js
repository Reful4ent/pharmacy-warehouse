const Router = require('express');
const router = new Router();
const buyerController = require('../controllers/buyer.controller');

router.post('/buyers/create', buyerController.createBuyer)
router.post('/buyers', buyerController.getBuyers)
router.get('/buyers/:id', buyerController.getOneBuyer)
router.put('/buyers/:id', buyerController.updateBuyer)
router.delete('/buyers/:id', buyerController.deleteBuyer)

module.exports = router;