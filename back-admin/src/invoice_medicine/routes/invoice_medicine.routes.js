const Router = require('express');
const router = new Router();
const invoiceMedicineController = require('../controllers/invoice_medicine.controller');

router.post('/invoiceMedicines', invoiceMedicineController.createInvoiceMedicine)
router.get('/invoiceMedicines', invoiceMedicineController.getInvoiceMedicines)
router.get('/invoiceMedicines/:id', invoiceMedicineController.getOneInvoiceMedicine)
router.put('/invoiceMedicines/:id', invoiceMedicineController.updateInvoiceMedicine)
router.delete('invoiceMedicines/:id', invoiceMedicineController.deleteInvoiceMedicine)

module.exports = router;