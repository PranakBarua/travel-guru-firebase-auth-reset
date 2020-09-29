import React from 'react';
import { useParams } from 'react-router-dom';
import fakeDataRoom from '../../fakeDataRoom';
import fakeDataPlace from '../../fakeDataPlace'
import './Search.css'
import Room from '../Room/Room';
const Search = () => {
    const {placeId}=useParams()
    const place=fakeDataPlace.find(pl=>pl.id===placeId)
    console.log(fakeDataPlace)
    console.log(place)
    return (
        <div className="search-container">
            <div className="detail-container">
                <p>257 stays Apr 13-17 3guests</p>
                <h4>Stay in {place.name}</h4>
                {
                    fakeDataRoom.map(rm=><Room room={rm}></Room>)
                }
            </div>
            <div className="map-container">

            </div>

        </div>
    );
};

export default Search;