import React, { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart]=useState([]);
    const [placeOrder, setPlaceOrder]=useState(false)
    const placeOrderHandeler = ()=>{
        setCart([]);
        processOrder();
        setPlaceOrder(true)
    }
    let thanks;
     if(placeOrder){
        thanks= <img src={happyImage} alt=""/>
    }
    
    useEffect(()=>{
        const products=getDatabaseCart()
        const ProductKeys = Object.keys(products)
        const count=ProductKeys.map(pd=>{
            const product= fakeData.find(product=>product.key===pd)
            product.quantity=products[pd];
            return product
        })
        setCart(count)
    },[])


    const removeProduct=(key)=>{
        console.log('remove clicked');
        const newcart=cart.filter(pd=>pd.key!==key) 
        setCart(newcart);
        removeFromDatabaseCart(key)
    }
    return (
        <div className='shop'>
            <div className="all-products">
                {
                    cart.map(pd=><ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thanks}
            </div>
            <div className="cart">
                <Cart cart={cart}>
                <Link to="/shipment"><Button onClick={placeOrderHandeler} className="addToCartBtn">Procced</Button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;