const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAll);
router.get('/products/random', ProductsController.getRandom);
router.get('/products/:id', ProductsController.getId);
router.post('/products', ProductsController.postNew);
router.put('/products/:id', ProductsController.putId);
router.delete('/products/:id', ProductsController.deleteId);

module.exports = router;
