const express = require('express');
const router = express.Router();
const CombinationsController = require("../controller/Combinations");

router.post('/combinations', CombinationsController.CombinationsController);

module.exports = router;