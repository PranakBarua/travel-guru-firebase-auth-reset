import React from 'react';
import './Room.css'
import logo from '../../Icon/star_1_.png'
const Room = (props) => {
    const {name,url,info,shortDes,cancellation,rating}=props.room
    return (
        <div className="room-detail">
            <div className="img-part">
                <img src={url} alt=""/>
            </div>
            <div>
                <h6 className="name">{name}</h6>
                <p>{info}</p>
                <p>{shortDes}</p>
                <p>{cancellation}</p>
                <h4 className="star-display">
                    <img className="star-img" src={logo} alt=""/>
                    <p>{rating}<span className="highlight">$34/</span>night <span className="disable">$167 total</span></p>
                </h4>
            </div>
        </div>
    );
};

export default Room;