import React, { Fragment, useState } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const InputPerson = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
      const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/person", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);
    
        if(!responseJson.includes("Error:")){
            window.location = "/person";
        }
      }

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Person</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
                <label>Firstname</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="firstName" 
                        value={inputs.firstName || ""} 
                        onChange={handleChange}
                    />
            </div>
            <div className="form-group my-3">
                <label>Lastname</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="lastName" 
                        value={inputs.lastName || ""} 
                        onChange={handleChange}
                    />
            </div>
            <div className="form-group my-3">
                <label>Birthday</label>
                <input 
                    className="form-control"
                    type="date"
                    id="birthday"
                    name="birthday"
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group my-3">
                    <label>Sex</label>
                        <select defaultValue={'DEFAULT'} name="sex" onChange={handleChange} className="form-select form-select-sm">
                            <option value="DEFAULT" disabled>
                                Choose a Sex
                            </option>
                            <option key="0" value="0">Diverse</option>
                            <option key="1" value="1">Female</option>
                            <option key="2" value="2">Male</option>
                    </select>
            </div>
            <div className="form-group my-3">
                <label>CV</label>
                    <textarea  
                        className="form-control"
                        type="text" 
                        name="cv" 
                        value={inputs.cv || ""} 
                        onChange={handleChange}
                    />
            </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputPerson;