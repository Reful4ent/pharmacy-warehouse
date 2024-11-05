const Router = require('express');
const router = new Router();
const bankController = require('../controllers/bank.controller');

router.post('/banks', bankController.createBank)
router.get('/banks', bankController.getBanks)
router.get('/banks/:id', bankController.getOneBank)
router.put('/banks/:id', bankController.updateBank)
router.delete('/banks/:id', bankController.deleteBank)


module.exports = router;