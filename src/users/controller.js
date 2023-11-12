const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

const getUsers = async (req, res) => {
  try {
    const { rows: users } = await pool.query(queries.getUsers);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsersByID = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: users } = await pool.query(queries.getUsersByID, [id]);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const { rows: users } = await pool.query(queries.getUsersByEmail, [email]);

    if (users.length !== 0) {
      return res.status(401).json({ message: "User already exists" });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashed_password = await bcrypt.hash(password, salt);

    const newUser = await pool.query(queries.registerUser, [
      email,
      hashed_password,
      first_name,
      last_name,
    ]);

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows: users } = await pool.query(queries.getUsersByEmail, [email]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect" });
    }
    console.log(users[0].hashed_password);
    const validPassword = await bcrypt.compare(
      password,
      users[0].hashed_password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect" });
    }

    const token = jwtGenerator(users[0].user_id);
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    console.log(req.user);
    res.json(true);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  getUsersByID,
  registerUser,
  loginUser,
  verifyUser,
  //   getMoviesByEmail,
  //   addMovie,
};
