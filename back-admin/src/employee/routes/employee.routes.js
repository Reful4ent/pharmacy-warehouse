const Router = require('express');
const router = new Router();
const employeeController = require('../controllers/employee.controller');

router.post('/employees/create', employeeController.createEmployee)
router.get('/employees', employeeController.getEmployees)
router.get('/employees/:id', employeeController.getOneEmployee)
router.put('/employees/:id', employeeController.updateEmployee)
router.delete('/employees/:id', employeeController.deleteEmployee)

module.exports = router;