const db = require('../../../db')

class StatementMedicineController {
    async createStatementMedicine(req, res) {}
    async getStatementMedicines(req, res) {}
    async getOneStatementMedicine(req, res) {
        const id = req.params.id
    }
    async updateStatementMedicine(req, res) {
        const id = req.params.id
    }
    async deleteStatementMedicine(req, res) {
        const id = req.params.id

    }
}

module.exports = new StatementMedicineController();