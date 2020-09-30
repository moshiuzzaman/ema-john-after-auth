import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [loginUser,setLoginUser]=useContext(userContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order Review</Link>
                <Link to="/manage">Manage Inventory here</Link>
                <Button onClick={()=>setLoginUser({})}>Sing Out</Button>
            </nav>
        </div>
    );
};

export default Header;