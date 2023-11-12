const express = require("express");
const todosRoutes = require("./src/todos/routes");
const usersRoutes = require("./src/users/routes");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/todos", todosRoutes);

app.use("/api/v1/users", usersRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
