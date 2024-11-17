const db = require('../../../db')

class MedicineProducerController {
    async createMedicineProducer(req, res) {}
    async getMedicineProducers(req, res) {}
    async getOneMedicineProducer(req, res) {
        const id = req.params.id
    }
    async updateMedicineProducer(req, res) {
        const id = req.params.id
    }
    async deleteMedicineProducer(req, res) {
        const id = req.params.id

    }
}

module.exports = new MedicineProducerController();