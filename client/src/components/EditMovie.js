import React, { Fragment, useState } from "react";

const EditMovie = ({movie}) => {
    const editMovie = async () => {
        try {
            console.log('Inputs:');
            console.log(inputs);
            const res = await fetch("http://localhost:5000/movie/" + movie.id, {method: "PUT", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)});
    
            console.log(res);
            window.location = "/movie";

        } catch (error) {
            console.log(error.message);
        }
    }

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <Fragment> 
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#editMovie${movie.id}`}>
            Edit
            </button>

            <div className="modal fade" id={`editMovie${movie.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Movie (ID: {movie.id})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group my-3">
                                <label>Parent Movie</label>
                                <input type="number" name="parentMovie" className="form-control" placeholder={movie.parent_movie} value={inputs.parent_movie} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Title</label>
                                <input type="text" name="title" className="form-control" placeholder={movie.title} value={inputs.tile} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Release Year</label>
                                <input type="number" name="releaseYear" className="form-control" placeholder={movie.release_year} value={inputs.release_year} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Required Age</label>
                                <input type="number" name="requiredAge" className="form-control" placeholder={movie.required_age} value={inputs.required_age} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Production Country</label>
                                <input type="text" name="productionCountry" className="form-control" placeholder={movie.production_country} value={inputs.production_country} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => editMovie()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditMovie;