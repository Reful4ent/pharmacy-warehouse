const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/category.controller')

router.post('/categories/create', categoryController.createCategory)
router.post('/categories', categoryController.getCategories)
router.get('/categories/:id', categoryController.getOneCategory)
router.put('/categories/:id', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

module.exports = router;