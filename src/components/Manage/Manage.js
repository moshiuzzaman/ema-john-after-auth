import React from 'react';
import { Button } from 'react-bootstrap';
import fakeData from '../../fakeData';

const Manage = () => {
    const handleAddProduct = () => {
        fetch('https://sheltered-savannah-58501.herokuapp.com/addProducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakeData)
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)})


    }
    return (
        <div>
            <h1>
                <Button onClick={handleAddProduct}>Add Product</Button>
            </h1>
        </div>
    );
};

export default Manage;