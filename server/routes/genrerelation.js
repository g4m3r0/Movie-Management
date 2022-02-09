// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add genre relation
exports.add =  async(req, res) => {
    try {
        const { movieId, genreId } = req.body;
        const newRole = await pool.query(
            "Call create_or_update_genre_relation(null, $1, $2)", [movieId, genreId]);

        res.json("Genre relation added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};


// Get genre relations
exports.get =  async(req, res) => {
    try {
        const allGenreRelations = await pool.query("SELECT * FROM genre_view");
        res.json(allGenreRelations.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete genre relation
exports.delete =  async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenreRelation = await pool.query("DELETE FROM mm_genre_relation WHERE id = $1", [id]);

        res.json("Genre Relation was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};