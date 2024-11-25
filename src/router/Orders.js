const express = require('express');
const router = express.Router();
const OrderController = require("../controller/Orders");

router.get('/orders', OrderController.getAllOrders);
router.post('/orders', OrderController.AddOrderController);
router.delete('/orders/:id', OrderController.deleteOrderById);



module.exports = router;