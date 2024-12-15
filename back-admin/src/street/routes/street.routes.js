const Router = require('express');
const router = new Router();
const streetController = require('../controllers/street.controller');

router.post('/streets/create', streetController.createStreet)
router.get('/streets', streetController.getStreets)
router.get('/streets/:id', streetController.getOneStreet)
router.put('/streets/:id', streetController.updateStreet)
router.delete('/streets/:id', streetController.deleteStreet)

module.exports = router;