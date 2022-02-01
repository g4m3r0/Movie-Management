// Read configuration from .env file
require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT || 5000;
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes //

// Add film related person [mm_person]
app.post("/person", async(req, res) => {
    try {
        const { firstName, lastName, birthday, sex, cv } = req.body;
        const newPerson = await pool.query("CALL create_or_update_person(null, $1, $2, $3, $4, $5)", [firstName, lastName, birthday, sex, cv]);
            //"INSERT INTO mm_person (first_name, last_name, birthday, sex, cv) VALUES($1, $2, $3, $4, $5) RETURNING *",
            //[firstName, lastName, birthday, sex, cv]);

        // Return the DB rows
        res.json(newPerson.rows[0]);

    } catch (error) {
        console.error(error);
    }
});

// Get film related person
app.get("/person", async(req, res) => {
    try {
        const allPersons = await pool.query("SELECT * FROM person_view");

        res.json(allPersons.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/person/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const person = await pool.query("SELECT * FROM person_view WHERE id = $1", [id]);

        res.json(todo.rows);

    } catch (error) {
        console.error(error);
    }
});

// Update film related person
app.put("/person/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, birthday, sex, cv} = req.body;

        const updatePerson = await pool.query("CALL create_or_update_person($1, $2, $3, $4, $5, $6)", [firstName, lastName, birthday, sex, cv]);
        //UPDATE mm_person SET first_name = $1, last_name = $2, birthday = $3, sex = $4, cv = $5  WHERE id = $6
        res.json("Person was updated!");

    } catch (error) {
        console.error(error);
    }
});

// Delete film related person
app.delete("/person/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deletePerson = await pool.query("DELETE FROM mm_person WHERE id = $1", [id]);

        res.json("Person was deleted!");

    } catch (error) {
        console.error(error);
    }
});


// Add movie [mm_movie]
app.post("/movie", async(req, res) => {
    try {
        const { parentMovie, title, releaseYear, requiredAge, productionCountry } = req.body;
        const newMovie = await pool.query("CALL create_or_update_movie(null, $1, $2, $3, $4, $5)", [parentMovie, title, releaseYear, requiredAge, productionCountry]);
            //"INSERT INTO mm_movie (parent_movie, title, release_year, required_age, production_country) VALUES($1, $2, $3, $4, $5) RETURNING *",
            //[parentMovie, title, releaseYear, requiredAge, productionCountry]);

        // Return the DB rows
        res.json(newMovie.rows[0]);

    } catch (error) {
        console.error(error);
    }
});

// Get movies
app.get("/movie", async(req, res) => {
    try {
        const allMovies = await pool.query("SELECT * FROM movie_view");

        res.json(allMovies.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/movie/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const movie = await pool.query("SELECT * FROM movie_view WHERE id = $1", [id]);

        res.json(movie.rows);

    } catch (error) {
        console.error(error);
    }
});

// Update movie
app.put("/movie/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {parentMovie, title, releaseYear, requiredAge, productionCountry} = req.body;
        console.log(req.body);
        const updateMovie = await pool.query("CALL create_or_update_movie($1, $2, $3, $4, $5, $6)", [id, parentMovie, title, releaseYear, requiredAge, productionCountry]);
        //UPDATE mm_movie SET parent_movie = $1, title = $2, release_year = $3, required_age = $4, production_country = $5  WHERE id = $6", [parentMovie, title, releaseYear, requiredAge, productionCountry]);
        
        res.json("Movie was updated!");

    } catch (error) {
        console.error(error);
    }
});

// Delete movie
app.delete("/movie/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteMovie = await pool.query("DELETE FROM mm_movie WHERE id = $1", [id]);

        res.json("Movie was deleted!");

    } catch (error) {
        console.error(error);
    }
});

// Add rating [mm_rating]
app.post("/rating", async(req, res) => {
    try {
        const { username, movieId, rating } = req.body;
        const newRating = await pool.query(
            "Call create_or_update_rating(null, $1, $2, $3)", [movieId, rating, username]);
            //"INSERT INTO mm_rating (user_id, movie_id, rating) VALUES($1, $2, $3) RETURNING *",
            

        // Return the DB rows
        res.json(newRating.rows[0]);

    } catch (error) {
        console.error(error);
    }
});

// Get rating
app.get("/rating", async(req, res) => {
    try {
        const allRatings = await pool.query("SELECT * FROM mm_rating");

        res.json(allRatings.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/rating/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const rating = await pool.query("SELECT * FROM mm_rating WHERE id = $1", [id]);

        res.json(rating.rows);

    } catch (error) {
        console.error(error);
    }
});

// Update rating
app.put("/rating/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {username, movieId, rating} = req.body;
        const updateRating = await pool.query(
            "Call create_or_update_rating($1, $2, $3, $4)", [id, movieId, rating, username]);
            //"UPDATE mm_rating SET user_id = $1, movie_id = $2, rating = $3 WHERE id = $6", [userId, movieId, rating]);
        
        res.json("Rating was updated!");

    } catch (error) {
        console.error(error);
    }
});

// Delete rating
app.delete("/rating/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteRating = await pool.query("DELETE FROM mm_rating WHERE id = $1", [id]);

        res.json("Rating was deleted!");

    } catch (error) {
        console.error(error);
    }
});

// Get suggestion
app.get("/suggest/:username", async(req, res) => {
    try {
        const {username} = req.params;
        const suggestedMovies = await pool.query("SELECT suggest_movie($1, 0)", [username]);

        res.json(suggestedMovies.rows);
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log("Server has started on port " + port);
});