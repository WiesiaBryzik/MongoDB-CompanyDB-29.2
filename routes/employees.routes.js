const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getId);
router.post('/employees', EmployeesController.postNew);
router.put('/employees/:id', EmployeesController.putId);
router.delete('/employees/:id', EmployeesController.deleteId);

module.exports = router;