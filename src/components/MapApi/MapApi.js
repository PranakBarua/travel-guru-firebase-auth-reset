import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
class MapApi extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };
     
      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
     
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };
    render() {
        return (
            <div style={{width:'500px'}}>
                <Map google={this.props.google} zoom={5}>
                
                <Marker onClick={this.onMarkerClick}
                        name={this.props.name} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                      
                </InfoWindow>
                </Map>
            </div>
        );
    }
}

// export default MapApi;

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAXqV9xc9Awc6rk9ir-n4OCnZ7WTYSOL7M")
  })(MapApi)