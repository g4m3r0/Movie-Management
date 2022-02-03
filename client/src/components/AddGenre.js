import React, { Fragment, useState } from "react";
import { handleError } from './Helpers'

const InputGenre = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();
        
        const response = await fetch("http://localhost:5000/genre", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes("Error:")){
            window.location = "/genre";
        }
      }

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Genre</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label>Genre Name</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="genreName"
                            value={inputs.genreName || ""} 
                            onChange={handleChange}
                        />
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputGenre;