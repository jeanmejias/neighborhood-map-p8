import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Sidebar extends Component {

    state = {
        searchedLocations: []
    }

    
    render() {

        let showingLocations;
        if (this.props.query.toLowerCase()) {
            const match = new RegExp(escapeRegExp(this.props.query.toLowerCase(), 'i'))
            showingLocations = this.props.foursquareVenues.filter((myVenue) => match.test(myVenue.venue.name.toLowerCase()))
        } else {
            showingLocations = this.props.foursquareVenues
        }

        showingLocations.sort(sortBy('venue.name'))

        return (
            <div id="location-sidebar">
                {/*JSON.stringify(this.state)*/}
                <h2 className="art-lyon" tabIndex="0">Restaurants in Loughborough </h2>
                <p className="credits">This project was made with Mapbox and the Foursquare API.</p>
                <div id="search-field">
                    <input
                        className='search-locations'
                        id="search"
                        type='text'
                        placeholder='Search locations'
                        aria-label='Search for art locations in Lyon'
                        value={this.state.query}
                        onChange={(event) => this.props.updateQuery(event.target.value)}
                    />
                </div>
                <ul className="location-list">
                        {   
                            showingLocations
                                .map((myVenue) => (
                                    <li
                                        key={myVenue.venue.id}
                                        className="location-list-item"
                                    >
                                        <button
                                        type="button"
                                        key={myVenue.venue.id}
                                        data-buttoncoord={`${[myVenue.venue.location.lng, myVenue.venue.location.lat]}`}
                                        className="sidebar-button"
                                        onClick={this.props.handleClick.bind(this)}
                                        >
                                            Info
                                        </button>
                                        {myVenue.venue.name}
                                    </li>
                                ))
                        }
                    </ul>
            </div>
        );
    }
}
 
export default Sidebar;