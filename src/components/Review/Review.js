import React, { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
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
    const [allProducts,setAllProducts]=useState([])
    useEffect(()=>{
        fetch('https://sheltered-savannah-58501.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setAllProducts(data))
    },[])

    useEffect(()=>{
        const products=getDatabaseCart()
        const ProductKeys = Object.keys(products)
    //     fetch('https://sheltered-savannah-58501.herokuapp.com/productsByKeys',{
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(ProductKeys)
    //     })
    //     .then(res => res.json())
    //     .then(data=>setCart(data))

    // },[])

        if(allProducts.length){
            const count=ProductKeys.map(pd=>{
                const product= allProducts.find(product=>product.key===pd)
                product.quantity=products[pd];
                return product
            })
            setCart(count)
        }
        
    },[allProducts])


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