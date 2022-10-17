import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
// import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  c = 'Devesh';

  state = {
    progress: 0
  }
  
  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  // apiKey = process.env.REACT_NEWS_APP_API
  render() {
//     let apiKey = process.env.REACT_APP_NEWS_API;
    let pagesize = 8;
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar color='grey' progress={this.state.progress}/><br/>
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={pagesize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={pagesize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={pagesize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={pagesize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={pagesize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={pagesize} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={pagesize} country="in" category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
