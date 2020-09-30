import React from 'react';
import "./Cart.css"
    
const Cart = (props) => {
    let total=0;
    const cart=props.cart;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total=total+item.price*item.quantity;
    }
    const fixdNum=(num)=>{
        const x= num.toFixed(2);
        return Number(x)
    }
    let ship =0
    if (total>70){
        ship=0
    }else if(total>20){
        ship=4.98
    }else if(total>0){
        ship=12.98
    }
    const beforeTax=fixdNum(total+ship)
    const tax=fixdNum(beforeTax/10)
    return (
        <div className="cart-main">
            <h3 className="center">Order Summary</h3>
                <h5 className="center">Items ordered: {cart.length}</h5>
                <p><small>Items : <span className="card-tk">${fixdNum(total)}</span> </small></p>
                <p><small>Shipping & Handling : <span className="card-tk">${ship}</span></small></p>
                <p><small>Total before tax: <span className="card-tk">${beforeTax}</span></small></p>
                <p><small>Estimate Tax : <span className="card-tk">${tax}</span></small></p>
                <h4 className="total">Order Total: <span className="card-tk">${fixdNum(beforeTax+tax)}</span></h4>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;