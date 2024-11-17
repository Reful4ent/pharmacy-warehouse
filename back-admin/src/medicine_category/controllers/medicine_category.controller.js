const db = require('../../../db')

class MedicineCategoryController {
    async createMedicineCategory(req, res) {}
    async getMedicineCategories(req, res) {}
    async getOneMedicineCategory(req, res) {
        const id = req.params.id
    }
    async updateMedicineCategory(req, res) {
        const id = req.params.id
    }
    async deleteMedicineCategory(req, res) {
        const id = req.params.id


    }
}

module.exports = new MedicineCategoryController();