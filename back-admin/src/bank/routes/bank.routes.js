const Router = require('express');
const router = new Router();
const bankController = require('../controllers/bank.controller');

router.post('/banks/create', bankController.createBank)
router.post('/banks', bankController.getBanks)
router.get('/banks/:id', bankController.getOneBank)
router.put('/banks/:id', bankController.updateBank)
router.delete('/banks/:id', bankController.deleteBank)


module.exports = router;