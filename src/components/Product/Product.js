import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock ,key} = props.product

    return (
        <div className="product">
            <img src={img} alt="" />
            <div className="">
                <h4 className="productName"> <Link to={"/product/"+key}>{name}</Link> </h4>
                <p><small>By : {seller}</small></p>
                <div className="product-ditails">
                    <div>
                        <p>Price : ${price}</p>
                        <p><small>only {stock} left in stock - order soon</small></p>
                        {props.showAddToCart && <button
                            onClick={() => props.addProductHandelar(props.product)}
                            className="addToCartBtn">
                            <FontAwesomeIcon icon={faShoppingBag} /> add to cart
                            </button>}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Product;