import React from 'react';
import { Button } from 'react-bootstrap';

const Manage = () => {
    const handleAddProduct=()=>{
        console.log('object added');
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