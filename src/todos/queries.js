const getTodos = "SELECT * FROM todos";
const getTodosByID = "SELECT * FROM todos WHERE todo_id = $1";
const getTodosByCategory = "SELECT * FROM todos WHERE category = $1";
const getTodosByCurrentStatus = "SELECT * FROM todos WHERE current_status = $1";
const getTodosByOwner = "SELECT * FROM todos WHERE todo_owner = $1";

const addTodo =
  "INSERT INTO todos (task, category, current_status, todo_owner) VALUES ($1, $2, $3, $4)";

const removeTodo = "DELETE FROM todos WHERE todo_id = $1";

const updateTodo =
  "UPDATE todos SET task = $1, category = $2, current_status = $3 WHERE todo_id = $4";

module.exports = {
  getTodos,
  getTodosByID,
  getTodosByCategory,
  getTodosByCurrentStatus,
  getTodosByOwner,
  addTodo,
  removeTodo,
  updateTodo,
};
