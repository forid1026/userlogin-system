import React, { useState }  from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photoURL: ''
  })
  
    
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photoURL: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
 
  })
  .catch(err =>{
    console.log(err);
    console.log(err.message);
  })
}

const handleSignOut = () => {
  firebase.auth().signOut()
  .then(res => {
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photoURL: ''
    }
    setUser(signedOutUser)

  })
  .catch(err => console.log(err))
}

  return (
    <div className="App">
      {
        user.isSignedIn ? 
        <button onClick={handleSignOut}>Sign out</button>
        : 
        <button onClick={handleSignIn}>Sign in</button>
        }

      {
        user.isSignedIn && 
        <div className="userInfo">
          <p>Welcome, {user.name}</p>
          <p>Your Email : {user.email}</p>
          <img src={user.photoURL} alt=""/>
        </div>
      }
    </div>
  );
}
export default App;
