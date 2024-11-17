const Router = require('express');
const router = new Router();
const supplierController = require('../conrollers/supplier.controller');

router.post('/suppliers', supplierController.createSupplier)
router.get('/suppliers', supplierController.getSuppliers)
router.get('/suppliers/:id', supplierController.getOneSupplier)
router.put('/suppliers/:id', supplierController.updateSupplier)
router.delete('suppliers/:id', supplierController.deleteSupplier)

module.exports = router;