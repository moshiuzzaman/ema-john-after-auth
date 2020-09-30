
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const firebaseInitialize=()=>{
    firebase.initializeApp(firebaseConfig);
}

export const googleSingInHandler =()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName, photoURL, email}=res.user;
      const singedIn={
        isSingIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success:true
      }
      return singedIn;
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code)
      console.log(error.message)
      // The email of the user's account used.
      console.log(error.email)
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credentia)
      // ...
    });
  }

 export const singOutHandler=()=>{
    return firebase.auth().signOut()
    .then(res=>{
      const singedOut={
        isSingIn: false,
        success:false,
        name: '',
        email: '',
        photo: '',
        error: "",

      }
      return singedOut;
    })
  }

export const isNewUserHandeler=(email,password,name )=>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res=>{
    const userinfo = res.user;
   userinfo.success = true;
   userinfo.error="";
  updateUserName(name);
  return userinfo;
  })
  .catch(error=> {
   const userinfo = {};
   userinfo.error=error.message
   userinfo.success = false;
  return userinfo
  });
 }

 export const isNotNewUser =(email, password)=>{
   
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res=>{
    const userinfo = res.user;
   userinfo.success = true;
   userinfo.error="";
  return userinfo;
  
  
  })
  .catch(function(error) {
    const userinfo = {};
    userinfo.error=error.message
    userinfo.success = false;
   return userinfo;
  
  });
 }

 const updateUserName =name=>{
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('updated');
    }).catch(function(error) {
      console.log(error.message);
    });
   }