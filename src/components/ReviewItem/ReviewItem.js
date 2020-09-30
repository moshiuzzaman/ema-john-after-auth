import React from 'react';

const ReviewItem = (props) => {
    const {name , quantity,img,key, price}=props.product
    // console.log(props.product);
    const styles = {
        border: '1px solid red',
        padding: '20px',
        margin: '50px',
        display: 'flex'
        
    }
    return (
        <div className="product">
            <img src={img} alt=""/>
            <div>
            <h4 className="productName">{name}</h4>
            <small>Price : {price}</small>
            <h3>quantity: {quantity}</h3>
            
            <button onClick={()=>props.removeProduct(key)} className="addToCartBtn">Delete</button>
            </div>
        </div>
    );
};

export default ReviewItem;