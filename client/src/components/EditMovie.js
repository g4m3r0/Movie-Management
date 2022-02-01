import React, { Fragment, useState } from "react";

const EditMovie = ({movie}) => {
    const editMovie = async () => {
        try {
            
            const res = await fetch("http://localhost:5000/movie", {method: "PUT", headers: { "Content-Type": "application/json" },
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
                            <input type="text" className="form-control" value={movie.title} onChange={handleChange}></input>
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