// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Get suggestion
exports.get = async(req, res) => {
    try {
        const { username } = req.params;
        const suggestedMovies = await pool.query("SELECT * FROM suggest_movies($1)", [username]);

        res.json(suggestedMovies.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};