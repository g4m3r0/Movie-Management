// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add film related person
exports.add = async function(req, res){
    try {
        const { firstName, lastName, birthday, sex, cv } = req.body;
        const newPerson = await pool.query("CALL create_or_update_person(null, $1, $2, $3, $4, $5)", [firstName, lastName, birthday, sex, cv]);

        res.json("Person was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get film related person
exports.get = async(req, res) => {
    try {
        const allPersons = await pool.query("SELECT * FROM person_view");

        res.json(allPersons.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

exports.getSingle = async(req, res) => {
    try {
        const { id } = req.params;
        const person = await pool.query("SELECT * FROM person_view WHERE id = $1", [id]);

        res.json(person.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Update film related person
exports.update = async(req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, birthday, sex, cv } = req.body;

        const updatePerson = await pool.query("CALL create_or_update_person($1, $2, $3, $4, $5, $6)", [id, firstName, lastName, birthday, sex, cv]);

        res.json("Person was updated!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete film related person
exports.delete = async(req, res) => {
    try {
        const { id } = req.params;
        const deletePerson = await pool.query("DELETE FROM mm_person WHERE id = $1", [id]);

        res.json("Person was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};