import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import NoMatch from './components/NoMatch/NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Product from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const userContext=createContext();
function App() {
  const [loginUser,setLoginUser]=useState({})
  console.log(loginUser);
  return (
    <userContext.Provider value={[loginUser,setLoginUser]} >

      <Router>
        <h3>Email: {loginUser.email }</h3>
        <h3>Name: {loginUser.name}</h3>
        <Header></Header>
          <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/order">
                <Review></Review>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <PrivetRoute path="/shipment">
                <Shipment/>
              </PrivetRoute>
              
              <PrivetRoute path="/manage">
                  <Manage/>
              </PrivetRoute>
              <Route exact path="/">
                  <Shop></Shop>
              </Route>
              <Route path="/product/:productkey">
                <ProductDetail></ProductDetail>
              </Route>
              <Route path="*">
                <NoMatch/>
              </Route>
          </Switch>
          
      </Router>
      
      
    </userContext.Provider>
  );
}

export default App;
