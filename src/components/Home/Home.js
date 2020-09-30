import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../Icon/Logo.png';
import header from '../../Image/Rectangle1.png';
import SinglePlace from '../SinglePlace/SinglePlace';
import fakeData from '../../fakeDataPlace'
import { UserContext } from '../../App';
const Home = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${header})` }} className="home">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    <li>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </li>
                    <li>
                        <Link to="/home">News</Link>
                    </li>
                    <li>
                        <Link to="/home">Destination</Link>
                    </li>
                    <li>
                        <Link to="/home">Blog</Link>
                    </li>
                    <li>
                        <Link to="/home">Contact</Link>
                    </li>
                    <li>
                        {
                            loggedInUser.isSigned?<button className="color-btn">{loggedInUser.name?loggedInUser.name:loggedInUser.email}</button>:
                            <Link to="/login"><button className="color-btn">Log in</button></Link>
                        }
                    </li>
                </ul>
            </nav>
            <div>
                {
                    fakeData.map(place=><SinglePlace place={place}></SinglePlace>)
                }
            </div>
        </div>
    );
};

export default Home;