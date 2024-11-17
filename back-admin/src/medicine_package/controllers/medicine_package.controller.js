const db = require('../../../db')

class MedicinePackageController {
    async createMedicinePackage(req, res) {}
    async getMedicinePackages(req, res) {}
    async getOneMedicinePackage(req, res) {
        const id = req.params.id
    }
    async updateMedicinePackage(req, res) {
        const id = req.params.id
    }
    async deleteMedicinePackage(req, res) {
        const id = req.params.id


    }
}

module.exports = new MedicinePackageController();