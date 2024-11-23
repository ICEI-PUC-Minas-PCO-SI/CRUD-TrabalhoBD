const router = express.Router();
const UserController = require("../controller/Users");

router.post('users', UserController.AddUserController);

module.exports = router;