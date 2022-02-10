import React, { Fragment, useState } from "react";
import { handleError, checkLogin } from './Helpers';
import env from "react-dotenv";

const EditRating = ({movie}) => {
    const editRating = async (movieId) => {
        try {
            if (!checkLogin()) {
                alert('Not logged in! Please login first!');
                return;
            }

            var username = window.sessionStorage.getItem('username');
            const body = {username, movieId, rating};

            const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/rating", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes("Error:")){
            window.location = "/movie";
        }
        } catch (error) {
            console.log(error.message);
        }
    }

    const [rating, setRating] = useState(movie.rating);

    return (
        <Fragment> 
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${movie.id}`}>
            Rate
            </button>

            <div className="modal fade" id={`id${movie.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={e => setRating(movie.rating)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Rate Movie {movie.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e => setRating(movie.rating)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Rate a movie from 0.0 (Bad) to 5.0 (Awesome).</p>
                            <input min="0" max="5" type="number" className="form-control" onChange={e => setRating(e.target.value)}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => setRating(movie.rating)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => editRating(movie.id)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditRating;