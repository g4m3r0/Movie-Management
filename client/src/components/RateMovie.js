import React, { Fragment, useState } from "react";

const EditRating = ({movie}) => {
    const editRating = async (movieId) => {
        try {
            var username = window.sessionStorage.getItem('username');

            if (!username) {
                alert('Not logged in! Please login first!');
                return;
            }

            const body = {username, movieId, rating};

            const res = await fetch(`http://localhost:5000/rating`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        console.log(res);
        window.location = "/movie";

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
                            <h5 className="modal-title" id="exampleModalLabel">Rate Movie (ID: {movie.id})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e => setRating(movie.rating)}></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={rating} onChange={e => setRating(e.target.value)}></input>
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