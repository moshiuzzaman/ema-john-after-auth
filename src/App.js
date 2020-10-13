import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import NoMatch from './components/NoMatch/NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const userContext=createContext();
function App() {
  const [loginUser,setLoginUser]=useState({})
  return (
    <userContext.Provider value={[loginUser,setLoginUser]} >

      <Router>
        <Header></Header>
          <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <PrivetRoute path="/order">
                <Review></Review>
              </PrivetRoute>
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
