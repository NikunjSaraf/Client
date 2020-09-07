import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
const StripePaymentCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };

  const showStripButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey="pk_test_51HIYhFKZF2CXbYarv3sOsCnXTslLVRAHungmoDkOsBoN1eYNL04PiPa4J3Mw8DB9XMnG6VJ7mHB8XyqVpCeX9mnm00owoXIecO"
        token={makePayment}
        amount={getAmount() * 100}
        name="Buy Tshirt"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="signin">
        <button className="btn btn-primary">Sign In</button>
      </Link>
    );
  };

  return (
    <div>
      <h1 className="text-white">Checkout {getAmount()}</h1>
      {showStripButton()}
    </div>
  );
};

export default StripePaymentCheckout;
