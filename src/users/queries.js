const getUsers = "SELECT * FROM users";
const getUsersByID = "SELECT * FROM users WHERE user_id = $1";
const getUsersByEmail = "SELECT * FROM users WHERE email = $1";
const registerUser =
  "INSERT INTO users (email, hashed_password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *";

module.exports = {
  getUsers,
  getUsersByID,
  getUsersByEmail,
  registerUser,
};
