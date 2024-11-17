const Router = require('express');
const router = new Router();
const medicineCategoryController = require('../controllers/medicine_category.controller');

router.post('/medicineCategories', medicineCategoryController.createMedicineCategory)
router.get('/medicineCategories', medicineCategoryController.getMedicineCategories)
router.get('/medicineCategories/:id', medicineCategoryController.getOneMedicineCategory)
router.put('/medicineCategories/:id', medicineCategoryController.updateMedicineCategory)
router.delete('medicineCategories/:id', medicineCategoryController.deleteMedicineCategory)

module.exports = router;