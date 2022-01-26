import React, { Fragment, useState } from "react";

const InputTodo = () => {

    //const [description, setDescription] = useState('');
    const [inputs, setInputs] = useState({});

    {/*
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/person", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)});

            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }
*/}

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
      }

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Person</h1>
            {/*
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input 
                    type="text"
                    placeholder="add todo"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn-success">Add</button>
            </form>
            */}

            <form onSubmit={handleSubmit}>
                <label>Firstname:
                    <input 
                        type="text" 
                        name="firstName" 
                        value={inputs.firstName || ""} 
                        onChange={handleChange}
                    />
                </label>
                <label>Lastname:
                    <input 
                        type="text" 
                        name="lastName" 
                        value={inputs.lastName || ""} 
                        onChange={handleChange}
                    />
                </label>
                <label>Birthday:
                    <input 
                        type="text" 
                        name="birthday" 
                        value={inputs.birthday || ""} 
                        onChange={handleChange}
                    />
                </label>
                <label>Sex:
                    <input 
                    type="number" 
                    name="sex" 
                    value={inputs.sex || ""} 
                    onChange={handleChange}
                    />
                </label>
                <label>CV:
                    <input 
                        type="text" 
                        name="cv" 
                        value={inputs.cv || ""} 
                        onChange={handleChange}
                    />
                </label>
                <input className="btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputTodo;