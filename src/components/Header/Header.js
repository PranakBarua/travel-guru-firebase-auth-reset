import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from '../../Icon/Logo.png';
import { UserContext } from '../../App';
const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (

        <div className="header">
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
                        <Link to="/login">Destination</Link>
                    </li>
                    <li>
                        <Link to="/login">Blog</Link>
                    </li>
                    <li>
                        <Link to="/login">Contact</Link>
                    </li>
                    <li>
                        {
                            loggedInUser.isSigned?<button className="color-btn">{loggedInUser.name?loggedInUser.name:loggedInUser.email}</button>:
                            <Link to="/login"><button className="color-btn">Log in</button></Link>
                        }       
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;