import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = () => {
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const location = useLocation();
  let { img, title, price, productId } = location.state;

  return token ? (
    <div className="payment-container">
      <div className="payment-card">
        <span>Acheter en ligne</span>
        <div className="payment-summary">
          <img alt="offer" src={img} />
          <div>
            <p>{title}</p>
            <p>{price} €</p>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            username={username}
            price={price}
            title={title}
            productId={productId}
          />
        </Elements>
      </div>
    </div>
  ) : (
    <Redirect to="/log_in" />
  );
};

export default Payment;
