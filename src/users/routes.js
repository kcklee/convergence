const { Router } = require("express");
const controller = require("./controller");
const authorization = require("../middleware/authorization");

const router = Router();

router.get("/", controller.getUsers);
router.get("/id/:id", controller.getUsersByID);

router.post("/", controller.registerUser);
router.post("/login", controller.loginUser);

router.get("/is-verify", authorization, controller.verifyUser);

module.exports = router;
