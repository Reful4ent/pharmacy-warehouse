const db = require('../../../db')

class InvoiceMedicineController {
    async createInvoiceMedicine(req, res) {}

    async getInvoiceMedicines(req, res) {}

    async getOneInvoiceMedicine(req, res) {
        const id = req.params.id
    }

    async updateInvoiceMedicine(req, res) {
        const id = req.params.id
    }


    async deleteInvoiceMedicine(req, res) {
        const id = req.params.id
    }
}

module.exports = new InvoiceMedicineController();