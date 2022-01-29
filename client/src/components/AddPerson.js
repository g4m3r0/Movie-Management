import React, { Fragment, useState } from "react";

const InputPerson = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();
        
        const response = await fetch("http://localhost:5000/person", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        console.log(response);
        window.location = "/";
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
                        type="text" 
                        name="birthday" 
                        value={inputs.birthday || ""} 
                        onChange={handleChange}
                    />
            </div>
            <div className="form-group my-3">
                <label>Sex</label>
                    <input 
                        className="form-control"
                        type="number" 
                        name="sex" 
                        value={inputs.sex || ""} 
                        onChange={handleChange}
                    />
            </div>
            <div className="form-group my-3">
                <label>CV</label>
                    <input 
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