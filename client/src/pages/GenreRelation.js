import React, { Component } from "react";
import ListGenreRelation from "../components/ListGenreRelation";
import InputGenreRelation from "../components/AddGenreRelation";

class Suggest extends Component {
  render() {
    return (
      <div className="container">
        <ListGenreRelation />
        <InputGenreRelation />
      </div>
    );
  }
}
 
export default Suggest;