const { Router } = require("express");
const controller = require("../controllers/usersController");
const authorization = require("../middleware/authorization");

const router = Router();

// route used to get all Users
router.get("/", controller.getUsers);

// route used to get Users with specific ID
router.get("/id/:id", controller.getUsersByID);

// route used to register a user
router.post("/", controller.registerUser);

// route used to login a user
router.post("/login", controller.loginUser);

// route used to verify a user's token
router.get("/is-verify", authorization, controller.verifyUser);

module.exports = router;
