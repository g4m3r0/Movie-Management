// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add role
exports.add = async(req, res) => {
    try {
        const { personId, movieId, role_type } = req.body;
        const newRole = await pool.query(
            "Call create_or_update_role(null, $1, $2, $3)", [personId, movieId, role_type]);

        res.json("Role was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get roles
exports.get = async(req, res) => {
    try {
        const allGenres = await pool.query("SELECT * FROM role_view");

        res.json(allGenres.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get roles distinct
exports.getDistinct = async(req, res) => {
    try {
        const allDistinctRoles = await pool.query("SELECT DISTINCT role_type FROM role_view");

        res.json(allDistinctRoles.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete role
exports.delete = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenre = await pool.query("DELETE FROM mm_role WHERE id = $1", [id]);

        res.json("Role was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};