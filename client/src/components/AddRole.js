import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const InputRole = () => {

    const [inputs, setInputs] = useState({});
    const [movies, setMovies] = useState([]);
    const [persons, setPersons] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = async event => {
        event.preventDefault();

        console.log(inputs);
        
        const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/role", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes('Error:')){
            window.location = '/role';
        }
    }

    async function getPersons() {
        const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/person");

        const personArray = await res.json();
        setPersons(personArray);
        console.log(personArray);
    }

    async function getMovies() {
        const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/movie");

        const movieArray = await res.json();
        setMovies(movieArray);
        console.log(movieArray);
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getPersons();
        getMovies();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Role</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label>Person</label>
                    <select defaultValue={'DEFAULT'} name="personId" onChange={handleChange} className="form-select form-select-sm">
                        <option value="DEFAULT" disabled>
                            Choose a Person
                        </option>
                        {persons.map(person => 
                            <option key={person.id} value={person.id}>{person.first_name + " " + person.last_name}</option>
                            )}
                    </select>
                </div>
                <div className="form-group my-3">
                    <label>Movie</label>
                    <select defaultValue={'DEFAULT'} name="movieId" onChange={handleChange} className="form-select form-select-sm">
                        <option value="DEFAULT" disabled>
                            Choose a Movie
                        </option>
                        {movies.map(movie => 
                            <option key={movie.id} value={movie.id}>{movie.title + " (" + movie.release_year + ")"}</option>
                            )}
                    </select>
                </div>
                <div className="form-group my-3">
                <label>Role</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="role_type" 
                        value={inputs.role_type || ""} 
                        onChange={handleChange}
                    />
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputRole;