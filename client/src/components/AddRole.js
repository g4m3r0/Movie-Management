import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers'

const InputRole = () => {

    const [inputs, setInputs] = useState({});
    const [movies, setMovies] = useState([]);
    const [persons, setPersons] = useState([]);
    const [roles, setRoles] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();

        console.log(inputs);
        
        const response = await fetch("http://localhost:5000/role", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes('Error:')){
            window.location = '/role';
        }
      }

      async function getPersons() {
        const res = await fetch("http://localhost:5000/person");

        const personArray = await res.json();
        setPersons(personArray);
        console.log(personArray);
    }

    async function getMovies() {
        const res = await fetch("http://localhost:5000/movie");

        const movieArray = await res.json();
        setMovies(movieArray);
        console.log(movieArray);
    }

    async function getRoles() {
        const res = await fetch("http://localhost:5000/role/distinct");

        const rolesArray = await res.json();
        setRoles(rolesArray);
        console.log(rolesArray);
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getPersons();
        getMovies();
        getRoles();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Role</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label>Person</label>
                    <select name="personId" onChange={handleChange} className="form-select form-select-sm">
                        <option selected disabled>
                            Choose a Person
                        </option>
                        {persons.map(person => 
                            <option value={person.id}>{person.first_name + " " + person.last_name}</option>
                            )}
                    </select>
                </div>
                <div className="form-group my-3">
                    <label>Movie</label>
                    <select name="movieId" onChange={handleChange} className="form-select form-select-sm">
                        <option selected disabled>
                            Choose a Person
                        </option>
                        {movies.map(movie => 
                            <option value={movie.id}>{movie.title + " (" + movie.release_year + ")"}</option>
                            )}
                    </select>
                </div>
                <div className="form-group my-3">
                    <label>Role</label>
                    <select name="role_type" onChange={handleChange} className="form-select form-select-sm">
                        <option selected disabled>
                            Choose a Role
                        </option>
                        {roles.map(role => 
                            <option value={role.role_type}>{role.role_type}</option>
                            )}
                    </select>
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputRole;