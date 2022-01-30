import React, { Fragment, useState } from "react";

const InputRating = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();
        
        const response = await fetch("http://localhost:5000/rating", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        console.log(response);
        window.location = "/";
      }

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Rating</h1>
            <form onSubmit={handleSubmit}>
                <label>User ID: (todo: use userid from window.sessionStorage)
                    <input 
                        type="number" 
                        name="userId" 
                        value={inputs.userId || "1"} 
                        onChange={handleChange}
                    />
                </label>
                <label>Movie ID:
                    <input 
                        type="number" 
                        name="movieId" 
                        value={inputs.movieId || ""} 
                        onChange={handleChange}
                    />
                </label>
                <label>Rating:
                    <input 
                        type="number" 
                        name="rating" 
                        value={inputs.rating || ""} 
                        onChange={handleChange}
                    />
                </label>
                <input className="btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputRating;