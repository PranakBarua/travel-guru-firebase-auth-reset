import React from 'react';
import Header from '../Header/Header';

const NotFound = () => {
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div style={{textAlign:'center',marginTop:'250px'}}>
                <h1>404,page not found...</h1>
            </div>
        </div>
    );
};

export default NotFound;