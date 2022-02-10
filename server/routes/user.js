// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Get users
exports.get = async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_view");

        res.json(allUsers.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Add user
exports.add = async(req, res) => {
    try {
        console.log(req.body);
        const { username, firstname, lastname, birthday, sex, email } = req.body;
        const newUser = await pool.query("INSERT INTO mm_user (user_name, last_name, first_name, birthday, sex, email) VALUES ($1, $2, $3, $4, $5, $6)", [username, firstname, lastname, birthday, sex, email]);

        res.json("User was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete user
exports.delete = async(req, res) => {
    try {
        const { user_name } = req.params;
        const deleteUser = await pool.query("DELETE FROM mm_user WHERE user_name = $1", [user_name]);

        res.json("User was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};