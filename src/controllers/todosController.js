const pool = require("../../db");
const queries = require("../queries/todosQueries");

// get all Todos
const getTodos = async (req, res) => {
  try {
    const { rows: todos } = await pool.query(queries.getTodos);

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get specific Todo by its ID
const getTodosByID = async (req, res) => {
  const id = req.params.id;

  try {
    const { rows: todos } = await pool.query(queries.getTodosByID, [id]);

    if (!todos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all Todos in given category
const getTodosByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByCategory, [
      category,
    ]);

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all Todos with given current status
const getTodosByCurrentStatus = async (req, res) => {
  const currentStatus = req.params.currentStatus;

  try {
    const { rows: todos } = await pool.query(queries.getTodosByCurrentStatus, [
      currentStatus,
    ]);

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all Todos from given owner (based on owner's ID)
const getTodosByOwner = async (req, res) => {
  const owner = req.params.owner;

  try {
    const { rows: todos } = await pool.query(queries.getTodosByOwner, [owner]);

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all Todos in given category for given user
const getTodosByCategoryUserSpecific = async (req, res) => {
  const category = req.params.category;
  try {
    const { rows: todos } = await pool.query(
      queries.getTodosByCategoryUserSpecific,
      [category, req.user]
    );

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all Todos with given status for given user
const getTodosByCurrentStatusUserSpecific = async (req, res) => {
  const currentStatus = req.params.currentStatus;

  try {
    const { rows: todos } = await pool.query(
      queries.getTodosByCurrentStatusUserSpecific,
      [currentStatus, req.user]
    );

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add a Todo (keeps track of user that added Todo with req.user)
const addTodo = async (req, res) => {
  const { task, category, current_status } = req.body;

  try {
    await pool.query(queries.addTodo, [
      task,
      category,
      current_status,
      req.user,
    ]);

    res.status(200).json({
      message: "Todo added successfully",
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({
      message: "An error occurred while adding the todo",
    });
  }
};

// remove a Todo (check authorization by comparing req.user with todo_owner of Todo)
const removeTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await findTodoByIdAndCheckAuthorization(id, req.user);

    if (result.notFound) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (result.unauthorized) {
      return res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    await pool.query(queries.removeTodo, [id]);
    res.status(200).json({ message: "Todo removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error for delete" });
  }
};

// update a Todo (check authorization by comparing req.user with todo_owner of Todo)
const updateTodo = async (req, res) => {
  const id = req.params.id;

  const { task, category, current_status } = req.body;

  try {
    const result = await findTodoByIdAndCheckAuthorization(id, req.user);

    if (result.notFound) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (result.unauthorized) {
      return res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    await pool.query(queries.updateTodo, [task, category, current_status, id]);
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error for update" });
  }
};

//helper function to check if task exists and to check if user has authorization
const findTodoByIdAndCheckAuthorization = async (id, user) => {
  try {
    const { rows: todos } = await pool.query(queries.getTodosByID, [id]);

    if (!todos.length) {
      return { notFound: true };
    }

    const todo_owner_id = todos[0].todo_owner;

    if (todo_owner_id !== user) {
      return { unauthorized: true };
    }

    return { todo: todos[0] };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error for find");
  }
};

module.exports = {
  getTodos,
  getTodosByID,
  getTodosByCategory,
  getTodosByCurrentStatus,
  getTodosByOwner,
  getTodosByCategoryUserSpecific,
  getTodosByCurrentStatusUserSpecific,
  addTodo,
  removeTodo,
  updateTodo,
};
