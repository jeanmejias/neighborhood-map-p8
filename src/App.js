import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './components/Map'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'



class App extends Component {
  constructor() {
    super();
    this.state = {
      places: null,
      markers: null,
      sidebarOpen: false,
      lastClickedPlace: null,
      lastClickedMarker: null,
    }
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.loadPlaces = this.loadPlaces.bind(this);
    this.liPlaceClick = this.liPlaceClick.bind(this);
  }

  toggleSideBar(bool) {
    this.setState({ sidebarOpen: bool || !this.state.sidebarOpen });
  }

  loadPlaces() {
    let city = 'loughborough';
    let query = 'Shopping';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=TX2XNCPJB4CNCKBRSVGRMFTVGZOKT1HXNZ2NFB5ANKIVDG4M&client_secret=CNCU2ZYY4DLW2VXMN231ZRYV2USO0LVZOLWC0E5KG1LLMJ3W&v=20180323%20&limit=33&near=' + city + '&query=' + query + '';

    return fetch(apiURL)
    .then(function(resp){ return resp.json() })
    .then(function(json){ return Promise.resolve(json); })
  }

  componentDidMount() {
    let self = this;
    self.loadPlaces()
    .then(function(data){
      let places = {};
      let markers = {};
      for(let venue of data.response.venues) {
        places[venue.id] = venue;
      }
      self.setState({ places: places, markers: markers, sidebarOpen: true }, () => {
        // console.log(self);
      })
    })
  }

  liPlaceClick(place) {
    this.setState({ lastClickedPlace: place });
  }

  render() {
    return (
      <div id="app-container">
        <Nav
          sidebarOpen={this.state.sidebarOpen}
          toggleSideBar={this.toggleSideBar} />

        <Sidebar
          liPlaceClick={this.liPlaceClick}
          sidebarOpen={this.state.sidebarOpen}
          toggleSideBar={this.toggleSideBar}
          places={this.state.places} />

        <GoogleMap
          places={this.state.places}
          lastClickedPlace={this.state.lastClickedPlace} />
      </div>
    );
  }
}

export default App;
