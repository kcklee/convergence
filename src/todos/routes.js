const { Router } = require("express");
const controller = require("./controller");
const authorization = require("../middleware/authorization");

const router = Router();

router.get("/", controller.getTodos);
router.get("/id/:id", controller.getTodosByID);
router.get("/category/:category", controller.getTodosByCategory);
router.get("/currentStatus/:currentStatus", controller.getTodosByCurrentStatus);
router.get("/owner/:owner", controller.getTodosByOwner);

router.post("/", authorization, controller.addTodo);

router.delete("/id/:id", authorization, controller.removeTodo);

router.put("/id/:id", authorization, controller.updateTodo);

module.exports = router;
