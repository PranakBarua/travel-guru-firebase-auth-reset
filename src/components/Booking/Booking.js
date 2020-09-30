import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Icon/Logo.png'
import header from '../../Image/Rectangle1.png';
import fakeDataPlace from '../../fakeDataPlace'
import './Booking.css'
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const Booking = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data =>{
        console.log(data);
    }
    const {placeId}=useParams()
    const place=fakeDataPlace.find(pl=>pl.id===placeId)
    const {name,description}=place
    const [selectedDate1, setSelectedDate1] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedDate2, setSelectedDate2] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChangeFrom = (date) => {
        setSelectedDate1(date);
    };
    const handleDateChangeTo = (date) => {
        setSelectedDate2(date);
    };
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
            <div className="full-side">
                <div className="left-side">
                    <h2>{name}</h2>
                    <p className="description-txt">{description}</p>
                </div>
                <div className="right-side">
                        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                    
                            <label>
                                Origin:
                                <br/>
                                <input name="origin" ref={register({ required: true })}/>
                                {errors.origin && <span className="error">Origin is required</span>}
                            </label>
                            <br/>
                           <label>
                               Destination:
                               <br/>
                                <input name="destination" ref={register({ required: true })}/>
                                {errors.destination && <span className="error">Destination is required</span>}
                           </label>
                           <br/>
                            <div style={{display:"flex"}}>
                            <label style={{width:'150px'}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline-From"
                                            label="From:"
                                            value={selectedDate1}
                                            onChange={handleDateChangeFrom}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            />
                                   
                                        </Grid>
                                </MuiPickersUtilsProvider>

                            </label>
                            <br/>
                            <label style={{width:'150px'}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline-To"
                                            label="To:"
                                            value={selectedDate2}
                                            onChange={handleDateChangeTo}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            />
                                   
                                        </Grid>
                                </MuiPickersUtilsProvider>

                            </label>
                            </div>
                            
                            <Link to={"/search/"+placeId}><input className="color-btn" type="submit" /></Link>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;