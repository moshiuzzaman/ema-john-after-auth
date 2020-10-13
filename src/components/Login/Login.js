import React, { useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseInitialize, googleSingInHandler, singOutHandler, isNotNewUser, isNewUserHandeler } from './loginMenegar';

firebaseInitialize()

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [isNewUser,setIsNewUser] =useState(false)
  const [user,setUser]=useState({
    isSingIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    success : '',
    error: ""
  })
  const sessionUser=(data)=>{
    sessionStorage.setItem('user', JSON.stringify(data))
  }

  const onBlur = (e) => {
    const fildName = e.target.name;
    const fildValue = e.target.value

    let isFildValid=true;
    if(fildName ==='email'){
       isFildValid =/\S+@\S+\.\S+/.test(fildValue)
      
    }
    if(fildName ==='password'){
       const isPasswordLengthValid = fildValue.length >5;
       const isPaaawordHasNumber=/\d{1}/.test(fildValue);
       isFildValid=isPasswordLengthValid && isPaaawordHasNumber ;
    }
   
    if(isFildValid){
      const newUser ={...user}
      newUser[fildName]=fildValue
      setUser(newUser)

    }
  }

   
  const submitHandler=(e)=>{
    if (isNewUser && user.email && user.password){
      isNewUserHandeler(user.email,user.password,user.name )
      .then(res=>{
        setUser(res)
        setLoginUser(res)
        sessionUser(res)
         history.replace(from);
      })
    }
    else if(!isNewUser && user.email && user.password){
      isNotNewUser(user.email, user.password)
     .then(res=>{
       setUser(res)
       setLoginUser(res)
       sessionUser(res)
       history.replace(from);
     })  
    }
    e.preventDefault()
 }


  const googleSingIn=()=>{
    googleSingInHandler()
    .then(res=>{
      setUser(res);
      setLoginUser(res)
      sessionUser(res)
      history.replace(from);
    })
  }
const singOut=()=>{
  singOutHandler()
  .then(res=>{
      setUser(res);
      setLoginUser(res)
    })
}



 
 const [loginUser,setLoginUser]=useContext(userContext)
  return (
  <div style={{textAlign:'center'}}>
   <div>
     {
       user.isSingIn ? <button onClick={singOut}>Sign Out By Google</button> : <button onClick={googleSingIn}>Sign in With Google</button>
     }
     {
       user.isSingIn && <div>
         <h1>Your name: {user.name}</h1>
         <h4>Your email: {user.email}</h4>
         <img src={user.photo} alt=""/>
       </div>
     }
   </div>
   <div>
     <input type="checkbox" onChange={()=>setIsNewUser(!isNewUser)} name="" id=""/>
     <label htmlFor="newUser">Newuser </label>
     <form action="">
       {isNewUser &&<input type="text" onBlur={onBlur} name="name" id="" placeholder="name"/>}
       <br/>
       <input type="text" onBlur={onBlur} name="email" id="" placeholder="email"/>
       <br/>
       <input type="password" onBlur={onBlur} name="password" id="" placeholder="pass" />
       <br/>
       <input type="submit" onClick={submitHandler} value={isNewUser ? "Sing Up" : "sing in"}/>
     </form>
     <p style={{color:"red"}}>{user.error}</p>
     {
       user.success && <p style={{color:"green"}}>Successfully {isNewUser ? 'Created': "login"}</p>
     }
   </div>
  </div>
  );
}

export default Login;
