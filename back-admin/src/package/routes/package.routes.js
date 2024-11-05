const Router = require('express');
const router = new Router();
const packageController = require('../controllers/package.controller');

router.post('/packages', packageController.createPackage)
router.get('/packages', packageController.getPackages)
router.get('/packages/:id', packageController.getOnePackage)
router.put('/packages/:id', packageController.updatePackage)
router.delete('/packages/:id', packageController.deletePackage)

module.exports = router;