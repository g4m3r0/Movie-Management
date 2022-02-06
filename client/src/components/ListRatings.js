import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers'

const ListRatings = () => {

    const [ratings, setRatings] = useState([]);

    async function getRatings() {
        const res = await fetch("http://localhost:5000/rating");

        const ratingArray = await res.json();
        setRatings(ratingArray);
        console.log(ratingArray);
    }

    async function deleteRating(id){
        try {

            // send request to the backend to delete the record
            const response = await fetch(`http://localhost:5000/rating/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setRatings(ratings.filter(rating => rating.id != id));

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getRatings();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Ratings</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">User</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    ratings.map(rating => (
                        <tr key={rating.id}>
                            <td>{rating.movie}</td>
                            <td>{rating.user}</td>
                            <td>{rating.rating}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteRating(rating.id)}>Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListRatings;