const pool = require("../../db");
const queries = require("../queries/usersQueries");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

// get all users
const getUsers = async (req, res) => {
  try {
    const { rows: users } = await pool.query(queries.getUsers);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get specific User by its ID
const getUsersByID = async (req, res) => {
  const id = req.params.id;

  try {
    const { rows: users } = await pool.query(queries.getUsersByID, [id]);

    if (!users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// register a user if it doesn't already exist in database and encrypt given password to store in database
// if successful, returns a token to the frontend that can later be passed for authorization purposes in later API calls
const registerUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const { rows: users } = await pool.query(queries.getUsersByEmail, [email]);

    if (users.length !== 0) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashed_password = await hashPassword(password);

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

//login user by comparing given password with password in database
// if successful, returns a token to the frontend that can later be passed for authorization purposes in later API calls
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: users } = await pool.query(queries.getUsersByEmail, [email]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect" });
    }

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

// helper function to hash password
const hashPassword = async (password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// verify user token
const verifyUser = async (req, res) => {
  try {
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
};
