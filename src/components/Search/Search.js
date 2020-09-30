import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import fakeDataRoom from '../../fakeDataRoom';
import fakeDataPlace from '../../fakeDataPlace'
import './Search.css'
import Room from '../Room/Room';
import Header from '../Header/Header';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { UserContext } from '../../App';
import MapApi from '../MapApi/MapApi';
const Search = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)

    const {placeId}=useParams()
    const apiKey="AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8"
    const key="AIzaSyAXqV9xc9Awc6rk9ir-n4OCnZ7WTYSOL7M"
    const place=fakeDataPlace.find(pl=>pl.id===placeId)
    const name=place.name
    console.log(fakeDataPlace)
    console.log(place)
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className="search-container">
                <div className="detail-container">
                    <p>257 stays Apr 13-17 3guests</p>
                    <h4>Stay in {place.name}</h4>
                    {
                        fakeDataRoom.map(rm=><Room room={rm}></Room>)
                    }
                </div>
                <div className="map-container">
                        <MapApi name={place.name}></MapApi>
                </div>
            </div>
        </div>
    );
};

export default Search;
// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8")
//   })(Search)

  //key=AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8
  //key=AIzaSyAXqV9xc9Awc6rk9ir-n4OCnZ7WTYSOL7M