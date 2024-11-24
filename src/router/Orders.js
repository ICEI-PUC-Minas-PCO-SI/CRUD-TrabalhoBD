const express = require('express');
const router = express.Router();
const OrderController = require("../controller/Orders");

router.post('/orders', OrderController.AddOrderController);

module.exports = router;