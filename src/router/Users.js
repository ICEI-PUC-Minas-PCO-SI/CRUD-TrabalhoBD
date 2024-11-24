const express = require('express');
const router = express.Router();
const UserController = require("../controller/Users");

router.post('/users', UserController.AddUserController);
router.post('/loginUsers', UserController.PostUserController);

module.exports = router;