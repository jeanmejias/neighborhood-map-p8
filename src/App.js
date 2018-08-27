import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    venues: []
  }

  componentDidMount() {
    this.getveneus()
     }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtUrZiNp3fTVPcCyaEr2cMRUeTc6JJ_Ec&callback=initMap')
    window.initMap = this.initMap
  }

  getveneus = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'TX2XNCPJB4CNCKBRSVGRMFTVGZOKT1HXNZ2NFB5ANKIVDG4M',
      client_secret:'CNCU2ZYY4DLW2VXMN231ZRYV2USO0LVZOLWC0E5KG1LLMJ3W',
      query:'food',
      near:'loughborough',
      v: '20180323'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
     this.setState({
       venues: response.data.response.groups[0].items
     }, this.renderMap())
    })
    .catch(error =>{
      console.log('ERROR!! ' + error)
    })
  }
// Create a map
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

/// Create An InfoWindow for markers
var infowindow = new window.google.maps.InfoWindow()

// Display Dynamic Markers on the map
this.state.venues.map(myVenue => {

  var contentString = `${myVenue.venue.name}`

  // Create A Marker
  var marker = new window.google.maps.Marker({
    position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
    map: map,
    title: myVenue.venue.name
  })

  // Click on A Marker!
  marker.addListener('click', function() {

    // Change the content
    infowindow.setContent(contentString)

    // Open An InfoWindow
    infowindow.open(map, marker)
  })

})

}
//create a map div
  render() {
    return (
      <main>
<div id='map'></div> 
      </main>
      
    )
  }
}


function loadScript(url) {
  var index  = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true 
  index.parentNode.insertBefore(script, index)
}


export default App;
