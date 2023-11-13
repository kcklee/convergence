const { Router } = require("express");
const controller = require("../controllers/todosController");
const authorization = require("../middleware/authorization");

const router = Router();

// route used to get all Todos
router.get("/", controller.getTodos);

// route used to get Todo with specific ID
router.get("/id/:id", controller.getTodosByID);

// route used to get Todos in a given category
router.get("/category/:category", controller.getTodosByCategory);

// route used to get Todos with given current status
router.get("/currentStatus/:currentStatus", controller.getTodosByCurrentStatus);

// route used to get Todos of given owner
router.get("/owner/:owner", controller.getTodosByOwner);

// route used to add a Todo (keep tracking of user)
router.post("/", authorization, controller.addTodo);

// route used to delete a Todo (authorization based on user id)
router.delete("/id/:id", authorization, controller.removeTodo);

// route used to update a Todo (authorization based on user id)
router.put("/id/:id", authorization, controller.updateTodo);

module.exports = router;
