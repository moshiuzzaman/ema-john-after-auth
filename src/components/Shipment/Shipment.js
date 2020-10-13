import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Payment from './Payment/Payment';
import "./Shipment.css"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from './Payment/SplitForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51HZyiHGLXX2ppd0FtVfJss7x4zAoO0L8uVcmZsV2O5dWfGtcsLkt9fSjPoX7GQG3cBAPgxt4Z7xYhqvIpkz7lLHP00nQL7IMGf');


const Shipment = () => {
const history=useHistory()
  const { register, handleSubmit, watch, errors } = useForm();
  const [loginUser, setLoginUser] = useContext(userContext)
  const [shipmentData,SetShipmentData] =useState(null)
  const saveCart = getDatabaseCart()
  const onSubmit = data => {
    SetShipmentData(data)
  }

const handlePayment=(paymentid)=>{
  const shipmentAllData = { ...loginUser, products: saveCart, shipment: shipmentData, paymentid }
  console.log(shipmentAllData);
    fetch('https://sheltered-savannah-58501.herokuapp.com/shipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shipmentAllData)
    }).then(res => res.json())
      .then(data => {
        processOrder()
        history.push('/')
        console.log(shipmentAllData);
      })
}
  return (
    <Container>
      <Row>
        <Col className="col-6" lg={6} md={6}>

          <form style={{display: shipmentData ? 'none' :'block'}} onSubmit={handleSubmit(onSubmit)}>

            <input name="name" placeholder="name" ref={register({ required: true })} /> <br />
            <input name="email" placeholder="Email" ref={register({ required: true })} /><br />
            <input name="adress" placeholder="Address" ref={register({ required: true })} /><br />
            <input name="Phone" placeholder="Phone number" ref={register({ required: true })} /><br />



            <input type="submit" />
          </form>
        </Col>
        <Col style={{display: shipmentData ? 'block' :'none'}} className="col-6" lg={6} md={6}>
          <Elements stripe={stripePromise}>
            <Payment handlePayment={handlePayment}/>
          </Elements>
        </Col>
      </Row>
    </Container>
  );
}

export default Shipment;