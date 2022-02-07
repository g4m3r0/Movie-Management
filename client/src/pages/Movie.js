import React, { Component } from "react";
import InputMovie from '../components/AddMovie';
import ListMovies from '../components/ListMovies';

class Movie extends Component {
  render() {
    return (
      <div className="container">
        <InputMovie />
        <ListMovies />
      </div>
    );
  }
}
 
export default Movie;