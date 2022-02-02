import React, { Component } from "react";
import ListRoles from "../components/ListRoles";
import InputRole from "../components/AddRole";

class Suggest extends Component {
  render() {
    return (
      <div className="container">
        <ListRoles />
        <InputRole />
      </div>
    );
  }
}
 
export default Suggest;