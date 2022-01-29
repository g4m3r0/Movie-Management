import React, { Component } from "react";
import InputMovie from '../components/AddMovie';
import ListMovies from '../components/ListMovies';

import InputRating from '../components/AddRating';
import ListRatings from '../components/ListRatings';

class Movie extends Component {
  render() {
    return (
      <div className="container">
        <ListMovies />
        <InputMovie />
      </div>
    );
  }
}
 
export default Movie;