// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add genre [mm_genre]
exports.add = async(req, res) => {
    try {
        const { genreName } = req.body;
        const newGenre = await pool.query(
            "Call create_or_update_genre(null, $1)", [genreName]);

        res.json("Genre was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Update genre
exports.update = async(req, res) => {
    try {
        const { id } = req.params;
        const { genreName } = req.body;

        const updateGenre = await pool.query(
            "Call create_or_update_genre($1, $2)", [id, genreName]);

        res.json("Rating was updated!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get genres
exports.get =  async(req, res) => {
    try {
        const allGenres = await pool.query("SELECT * FROM mm_genre ORDER BY genre_name ASC");
        res.json(allGenres.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete genre
exports.delete = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenre = await pool.query("DELETE FROM mm_genre WHERE id = $1", [id]);

        res.json("Genre was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};