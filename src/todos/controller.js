const pool = require("../../db");
const queries = require("./queries");

const getTodos = async (req, res) => {
  try {
    const { rows: todos } = await pool.query(queries.getTodos);
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTodosByID = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByID, [id]);

    if (!todos.length) {
      return res.status(200).json({ message: "Todo not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTodosByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByCategory, [
      category,
    ]);

    if (!todos.length) {
      return res.status(200).json({ message: "No Todos found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTodosByCurrentStatus = async (req, res) => {
  const currentStatus = req.params.currentStatus;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByCurrentStatus, [
      currentStatus,
    ]);

    if (!todos.length) {
      return res.status(200).json({ message: "No Todos found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

const removeTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByID, [id]);
    if (!todos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todo_owner_id = todos[0].todo_owner;

    if (todo_owner_id !== req.user) {
      return res.status(404).json({ message: "User not authorized" });
    }

    try {
      await pool.query(queries.removeTodo, [id]);
      res.status(200).json({ message: "Todo removed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error for delete" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error for find" });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { task, category, current_status } = req.body;
  try {
    const { rows: todos } = await pool.query(queries.getTodosByID, [id]);

    if (!todos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todo_owner_id = todos[0].todo_owner;

    if (todo_owner_id !== req.user) {
      return res.status(404).json({ message: "User not authorized" });
    }

    try {
      await pool.query(queries.updateTodo, [
        task,
        category,
        current_status,
        id,
      ]);
      res.status(200).json({ message: "Todo updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error for update" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error for find" });
  }
};

module.exports = {
  getTodos,
  getTodosByID,
  getTodosByCategory,
  getTodosByCurrentStatus,
  getTodosByOwner,
  addTodo,
  removeTodo,
  updateTodo,
  // getMoviesByGenre,
  //   getMoviesByEmail,
  //   addMovie,
};
