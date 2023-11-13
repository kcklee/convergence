const express = require("express");
const todosRoutes = require("./src/routes/todosRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

// testing localhost:3000/ works
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// using localhost:3000/api/v1/todos (= "/" in todosRoutes.js)
app.use("/api/v1/todos", todosRoutes);

// using localhost:3000/api/v1/users (= "/" in usersRoutes.js)
app.use("/api/v1/users", usersRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
