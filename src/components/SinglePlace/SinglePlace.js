import React from 'react';

const SinglePlace = (props) => {
    console.log(props.place)
    const {name,shortDes,description,img,url}=props.place
    return (
        <div>
            <img src={img} alt=""/>
            <h1>{name}</h1>
        </div>
    );
};

export default SinglePlace;
