import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { setBag } from "../../Redux/bagReducer";
import { setUser } from "../../Redux/userReducer";
import { connect } from "react-redux";
import BagItem from "./BagItem";
import { loadStripe } from '@stripe/stripe-js';
import "./Bag.css";

const stripePromise = loadStripe('pk_test_51IJM2nCrvY2fBYe0o12sOnbhhNq2hoom9M61xiPYA8azM15GgFwh2NTR90tVroUgDe9EoPNvOcAiF5HZyTAtHOy800oshwwwDd');

const Bag = (props) => {
  const { bag, setBag } = props;


  useEffect(() => {
    axios
      .get("/api/bag")
      .then((response) => {
        setBag(response.data);
      })
      .catch((err) => console.log(err));
  }, [setBag]);
  // console.log(bag);

   

  const handleClick = async (event) => {
    let total = 20000;
    axios.get(`api/bag/total/${bag[0].bag_id}`)
    .then(async(res) => {
      total = res.data.sum
      //  console.log(response.data)
       // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(`/create-checkout-session/` +total, { method: 'POST'});

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      return alert(result.error.message)
    }
    })
   
    
    

  };

  return (
    <div className="container-bag">
      <h1>Your Bag</h1>
      {bag[0]?bag?.map((item, index) => {
        return <BagItem key={index} item={item} setBag={setBag} />;
      }):null}
      <button role='link' onClick={handleClick}>Checkout</button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    bag: reduxState.bagReducer.bag,
    user: reduxState.userReducer.user
  };
};

export default connect(mapStateToProps, { setBag })(Bag);
