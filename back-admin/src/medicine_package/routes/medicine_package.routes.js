const Router = require('express');
const router = new Router();
const medicinePackageController = require('../controllers/medicine_package.controller');

router.post('/medicinePackages', medicinePackageController.createMedicinePackage)
router.get('/medicinePackages', medicinePackageController.getMedicinePackages)
router.get('/medicinePackages/:id', medicinePackageController.getOneMedicinePackage)
router.put('/medicinePackages/:id', medicinePackageController.updateMedicinePackage)
router.delete('medicinePackages/:id', medicinePackageController.deleteMedicinePackage)

module.exports = router;