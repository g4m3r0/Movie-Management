import React, { Component } from 'react';
import  { Route, Routes } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import User from './pages/User';

import Movie from './pages/Movie';
import Genre from './pages/Genre';
import GenreRelation from './pages/GenreRelation';

import Rating from './pages/Rating';
import Suggest from './pages/Suggest';

import Person from './pages/Person';
import Role from './pages/Role';

class App extends Component {
  render() {
  return (
      <div>
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/user" element={<User />}/>
            <Route path="/movie" element={<Movie />}/>
            <Route path="/genre" element={<Genre />}/>
            <Route path="/genrerelation" element={<GenreRelation />}/>
            <Route path="/rating" element={<Rating />}/>
            <Route path="/suggest" element={<Suggest />}/>
            <Route path="/person" element={<Person />}/>
            <Route path="/role" element={<Role />}/>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}
}

export default App;
