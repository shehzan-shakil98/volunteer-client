import React, { useContext } from 'react';
import logo from '../../logos/Group 1329.png';
import { useHistory, useLocation } from 'react-router-dom';
import googleIcon from '../../logos/unnamed.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Context } from '../../App';

const LogIn = () => {
    const history = useHistory();
    const location = useLocation()
   
    const btnStyle = {
        width: '100%',
        height: '50px',
        borderRadius: '20px',
        border: 'none',
        outline: 'none',
    }
    let { from } = location.state || { from: { pathname: "/" } };

    const[user,setUser] = useContext(Context)
    const provider = new firebase.auth.GoogleAuthProvider();
    if (firebase.apps.length===0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleSubmit = () => {
        history.push('/register')
        firebase.auth().signInWithPopup(provider)
        .then( result =>{
            const { displayName, email } = result.user;
            const newUser = { ...user, name: displayName, email: email }
            sessionStorage.setItem('email', newUser.email);
            setUser(newUser);
            history.replace(from);
            console.log(newUser)
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
    
    return (
        <div style={{background: '#F8FAFC',paddingBottom:'50px'}}>
            <img style={{ height: '60px',margin:'50px 0' }} src={logo} alt="" />
            <form action="/register" method="post" id="register" style={{height: '500px'}}>
                <div style={{marginTop: '50%',    transform: 'translate(0,-50%)',}}>
                    <h3 style={{ lineHeight: '29px', marginBottom: '50px' }}>Log In With</h3>
                    <button style={btnStyle} onClick={handleSubmit} type="submit"><img style={{height: '20px'}} src={googleIcon} alt=""/> continue with google</button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;