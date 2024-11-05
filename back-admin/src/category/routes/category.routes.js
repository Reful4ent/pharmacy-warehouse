const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/category.controller')

router.post('/categories', categoryController.createCategory)
router.get('/categories', categoryController.getCategories)
router.get('/categories/:id', categoryController.getOneCategory)
router.put('/categories/:id', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

module.exports = router;