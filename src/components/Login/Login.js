import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import fbImg from '../../Icon/fb.png'
import googleImg from '../../Icon/google.png'
import { UserContext } from '../../App';
const Login = () => {
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig)
      }
      const [user,setUser]=useState({
        isConfirmPassExist:false,
        isSigned:false,
        name:'',
        email:'',
        photo:'',
        password:'',
        confirmPassword:'',
        success:false,
        error:''
    })
    const [newUser,setNewUser]=useState(false)
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    //Handle Google Sign in
    const handleGoogleSignIn=()=>{
      firebase.auth().signInWithPopup(googleProvider)
      .then(res=> {
        const {email,displayName,photoURL}=res.user
        const UserInfo={
            isSigned:true,
            name:displayName,
            email:email,
            photo:photoURL,
        }
        setUser(UserInfo)
        setNewUser(user)
        setLoggedInUser(UserInfo)
        history.replace(from);
      })
      .catch(error=>{
        var errorMessage = error.message;
        const UserInfo={...user}
        UserInfo.success=false
        UserInfo.error=errorMessage
        setUser(user)
        setLoggedInUser(UserInfo)
      });
    }
    //handle facebook signin
    const handleFbSignIn=()=>{
      firebase.auth().signInWithPopup(fbProvider)
      .then(result=> {
        var token = result.credential.accessToken;
        var user = result.user;
        const userInfo={
          isSigned:true,
          success:true,
          error:'',
          name:user.displayName,
          email:user.email
        }
        setUser(userInfo)
        setNewUser(user)
        setLoggedInUser(userInfo)
        history.replace(from);
        console.log(result)
      })
      .catch(error=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage)
      });
    }

    const handleBlur=(e)=>{
        // console.log(e.target.name,e.target.value);
        let isFieldValid=true;
        if(e.target.name==='email'){
          isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
        }
        else if(e.target.name==='password'){
          const isPasswordValid=e.target.value.length>6
          const isNumberValid= /\d{1}/.test(e.target.value)
          isFieldValid=isPasswordValid && isNumberValid
        }
        else if(e.target.name==='confirmPassword'){
          // const isPasswordValid=e.target.value.length>6
          // const isNumberValid= /\d{1}/.test(e.target.value)
          if(user.password!==e.target.value){
            isFieldValid=false
            const newUserInfo={...user}
            newUserInfo.isConfirmPassExist=true
            setUser(newUserInfo)
          }
          else{
            isFieldValid=true
          }
        }
        if(isFieldValid){
          const newUserInfo={...user}
          newUserInfo[e.target.name]=e.target.value
          setUser(newUserInfo)
        }
      }

      const handleSubmit=(e)=>{
        // if(user.password!==user.confirmPassword){
        //   const newUserInfo={...user}
        //   newUserInfo.isConfirmPassExist=true
        //   setUser(newUserInfo)
        // }
        if(!newUser && user.email && user.password && user.confirmPassword){
            console.log(newUser,user.email,user.password)
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const UserInfo={...user}
                UserInfo.success=true
                UserInfo.isConfirmPassExist=false
                UserInfo.isSigned=true
                UserInfo.error=''
                UserInfo.isSignedIn=true
                setUser(UserInfo)
                setNewUser(user)
                sendDataToFirebase(user)
                setLoggedInUser(UserInfo)
            })
            .catch(error=> {
                var errorMessage = error.message;
                const UserInfo={...user}
                UserInfo.success=false
                UserInfo.error=errorMessage
                setUser(UserInfo)
                setLoggedInUser(UserInfo)
            });
        }
        if(newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                console.log(newUser,user.email,user.password)
                const UserInfo={...user}
                UserInfo.success=true
                UserInfo.isConfirmPassExist=false
                UserInfo.error=''
                UserInfo.isSigned=true
                setUser(UserInfo)
                setNewUser(user)
                setLoggedInUser(UserInfo)
                history.replace(from);
                console.log(user)
            })
            .catch(function(error) {
                var errorMessage = error.message;
                const UserInfo={...user}
                UserInfo.success=false
                UserInfo.error=errorMessage
                setUser(UserInfo)
                setLoggedInUser(UserInfo)
            });
        }
        e.preventDefault();
    }
    const sendDataToFirebase=(user)=>{
        firebase.auth().onAuthStateChanged(function(user) {

          if (user) {

            // Updates the user attributes:

            user.updateProfile({ // <-- Update Method here

              displayName: user.firstName

            }).then(function() {

              // Profile updated successfully!
              //  "NEW USER NAME"

              var displayName = user.firstName;
              newUser.firstName=displayName
              setNewUser(newUser)
              // "https://example.com/jane-q-user/profile.jpg"

            }, function(error) {
              // An error happened.
            });     

          }
     });
  }
    return (
        <div className="login-form">
          <p>name:{newUser.name}</p>
            <form onSubmit={handleSubmit}>
                {
                  !newUser&&<><input className="margin-bottom" type="text" name="firstName" onBlur={handleBlur} placeholder="First Name"/>
                  <br/>
                  </>
                }
                 {
                  !newUser&&<><input className="margin-bottom" type="text" name="lastName" onBlur={handleBlur} placeholder="Last Name"/>
                  <br/>
                  </>
                }
                <input className="margin-bottom" type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                <br/>
                <input className="margin-bottom" type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                <br/>
                {
                  !newUser&&<><input className="margin-bottom" type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm password" required/>
                  <br/>
                  </>
                }
                {
                    newUser?<input className="search-button" type="submit" value="Log In"/>:
                    <input className="search-button" type="submit" value="Create an account"/>
                }
            </form>
            {
              newUser?<p>Don't have an account?<Link className="account-message" onClick={()=>setNewUser(false)}>Create a new account</Link></p>:
             <p>Already have an account?<Link className="account-message" onClick={()=>setNewUser(true)}>Login</Link></p>
            }
            <br/>
            <h5>Or</h5>
            <br/>
            <button onClick={handleFbSignIn} className="social-media-button"><img src={fbImg} alt=""/> Continue with facebook</button>
            <br/>
            <br/>
            <button onClick={handleGoogleSignIn} className="social-media-button"><img src={googleImg} alt=""/> Continue with Google</button>
            <br/>
            <br/>
            {
              user.isConfirmPassExist && <p style={{color:'red'}}>Password and Confirm password are not same</p>
            }
            {/* {user.success && <h1 style={{color:'green'}}>User {newUser.isSigned?'created':'LoggedIn'} successfully</h1>} */}
        </div>
    );
};

export default Login;