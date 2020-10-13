import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey}=useParams()
    const [product,setProduct]=useState({})
    useEffect(()=>{
        fetch(`https://sheltered-savannah-58501.herokuapp.com/product/${productkey}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;