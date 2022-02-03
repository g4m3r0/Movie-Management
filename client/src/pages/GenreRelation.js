import React, { Component } from "react";
import ListGenreRelation from "../components/ListGenreRelation";
import InputGenreRelation from "../components/AddGenreRelation";

class GenreRelation extends Component {
  render() {
    return (
      <div className="container">
        <ListGenreRelation />
        <InputGenreRelation />
      </div>
    );
  }
}
 
export default GenreRelation;