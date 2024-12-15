const Router = require('express');
const router = new Router();
const invoiceController = require('../controllers/invoice.controller');

router.post('/invoices/create', invoiceController.createInvoice)
router.get('/invoices', invoiceController.getInvoices)
router.get('/invoices/:id', invoiceController.getOneInvoice)
router.put('/invoices/:id', invoiceController.updateInvoice)
router.delete('/invoices/:id', invoiceController.deleteInvoice)

module.exports = router;