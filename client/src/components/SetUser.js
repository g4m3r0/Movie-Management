import React, { Fragment, useState, useEffect } from "react";

const SetUser = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();

        window.sessionStorage.setItem('username', inputs.userName);
        checkLogin();
      }

      useEffect(() => {
        checkLogin();
      });

      const checkLogin = () => {
            //todo check if user exists?
            var tmpUserName = window.sessionStorage.getItem('username');
            console.log(`Username: ${tmpUserName}`);
            if (!tmpUserName) {
                document.getElementById('login').innerHTML = 'Login';
            } else {
                document.getElementById('login').innerHTML = `Logged in as ${tmpUserName}`;
            }
        }

    return (
        <Fragment>
            <h1 id="login" className="text-center my-5">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label>Username</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="userName" 
                        value={inputs.userName || ""} 
                        onChange={handleChange}
                    />
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default SetUser;