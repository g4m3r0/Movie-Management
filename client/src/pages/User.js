import React, { Component } from "react";

import ListUsers from "../components/ListUsers";

class User extends Component {
  render() {
    return (
      <div className="container">
        <ListUsers />
      </div>
    );
  }
}
 
export default User;