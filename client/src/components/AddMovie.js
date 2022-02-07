import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const InputMovie = () => {

    const [inputs, setInputs] = useState({});
    const [movies, setMovies] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    async function getMovies() {
          const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/movie");
  
          const movieArray = await res.json();
          setMovies(movieArray);
          console.log(movieArray);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        
        const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/movie", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes("Error:")){
            window.location = "/movie";
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                        <label>Parent Movie</label>
                        <select name="parentMovie" onChange={handleChange} className="form-select form-select-sm">
                            <option selected disabled>
                                Choose a Movie
                            </option>
                            {movies.map(movie => 
                                <option value={movie.id}>{`${movie.title} (${movie.release_year}) `}</option>
                            )}
                        </select>
                </div>
                <div className="form-group my-3">
                    <label>Title</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="title" 
                            value={inputs.title || ""} 
                            onChange={handleChange}
                        />
                    
                </div>
                <div className="form-group my-3">
                    <label>Release Year</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="releaseYear" 
                            value={inputs.releaseYear || ""} 
                            onChange={handleChange}
                        />
                    
                </div>
                <div className="form-group my-3">
                    <label>Required Age</label>
                        <input 
                        className="form-control"
                        type="number" 
                        name="requiredAge" 
                        value={inputs.requiredAge || ""} 
                        onChange={handleChange}
                        /> 
                </div>
                <div className="form-group my-3">
                    <label>Production Country</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="productionCountry" 
                            value={inputs.productionCountry || ""} 
                            onChange={handleChange}
                        />
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputMovie;