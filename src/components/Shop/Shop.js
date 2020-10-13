import React, { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Shop = () => {

    const [products,setProducts]=useState([])
    const products10=products.slice(0,10)

   const [cart, setCart]=useState([])
    useEffect(()=>{
        fetch('https://sheltered-savannah-58501.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    useEffect(()=>{
        const productsDatabase =getDatabaseCart()
        const productKeys=Object.keys(productsDatabase);
       if(products.length){
        const count = productKeys.map(pdKey=>{
            const product=products.find(pd=> pd.key===pdKey)
            product.quantity= productsDatabase[pdKey]
            return product;
        })
        setCart(count)
       }

    },[products])
    // useEffect(()=>{
    //     const products=getDatabaseCart()
    //     const ProductKeys = Object.keys(products)
    //     fetch('https://sheltered-savannah-58501.herokuapp.com/productsByKeys',{
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(ProductKeys)
    //     })
    //     .then(res => res.json())
    //     .then(data=>setCart(data))

    // },[])
   
    const addProductHandelar=(product)=>{
        const toBeAddedKey=product.key;
        const alreadyAdded=cart.find(pd=>pd.key===toBeAddedKey);
        let count=1;
        let newCart
        if(alreadyAdded){
            count= alreadyAdded.quantity+1;
            alreadyAdded.quantity=count;
            const other=cart.filter(pd=>pd.key!==toBeAddedKey);
             newCart=[...other, alreadyAdded]
             

        }else{
            product.quantity=1;
            newCart=[...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='shop'>
            <div className="all-products">
                {
                    products10.map(p=>
                    <Product 
                    key={p.key} 
                    showAddToCart={true} 
                    addProductHandelar={addProductHandelar} 
                    product={p}>
                    </Product>)
                }
            </div>
            <div className="cart">
                <Cart cart={cart}>
                    <Link to="/order"><Button className="addToCartBtn">Review</Button></Link> 
                </Cart>
            </div>
           
            
           
                
            
        </div>
    );
};

export default Shop;