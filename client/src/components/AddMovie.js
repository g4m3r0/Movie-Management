import React, { Fragment, useState } from "react";

const InputMovie = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();
        
        const response = await fetch("http://localhost:5000/movie", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        console.log(response);
        window.location = "/";
      }

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Movie</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
                <label>Parent Movie</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="parentMovie"
                        value={inputs.parentMovie || ""} 
                        onChange={handleChange}
                    />
                
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