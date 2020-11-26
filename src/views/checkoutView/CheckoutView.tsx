import React, { useEffect, useState } from "react";
import Basket from "../../components/basket/Basket";
import { useStateValue } from "../../components/shared/provider/StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./CheckoutView.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../components/shared/provider/Reducer";

//import { loadStripe } from "@stripe/stripe-js";
import axios from "../../components/shared/provider/axios";
import { db } from "../../components/shared/provider/firebase";

// const promise = loadStripe(
//   "pk_test_51Ho3r8JvugdMxF8ptK82mSnk4hsk8ZrRKTMzIQNvBN3rjOBNLOgaw6Pltydw0AVgoTQIritC5oUxsOwqN4W1fbJ900aesaPkpU"
// );
const CheckoutView = (): any => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(Boolean);
  const [clientSecret, setClientSecret] = useState("true");
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const cardItem = elements?.getElement(CardElement);

  useEffect(() => {
    // generates the special stripe secret wich allow us to charge a customer
    const getClientSecret = async () => {
      const responce = await axios({
        method: "post",
        // Stripe expect the currency total in subunits  so put * 100
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(responce.data.clientSecret);
    };

    getClientSecret();
  }, [basket]); // whenever the basket changes, make the request and update the special stripe secret that allow us to charge the custumers correct ammount

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    const payload: any = await stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardItem!,
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent?.id).set({
          basket: basket,
          amount: paymentIntent?.amount,
          created: paymentIntent?.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };
  const handleChange = (e: any) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout:
          <Link to="/basket">({basket.length} items)</Link>
        </h1>
        {/* PAYMENT SECTION - PAYMENT ADRESS */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Adress:</h3>
          </div>
          <div className="payment_adress">
            <p>{user?.email}</p>
            <p>Drottningsgatan 2,</p>
            <p>Umeå, Sweden</p>
          </div>
        </div>
        {/* PAYMENT SECTION - REVIEW ITEMS */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">{Basket()}</div>
        </div>
        {/* PAYMENT SECTION - PAYMENT METHOD */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <div className="payment_card_info">
              <h5 className="obs">please fill the following test card information: </h5>
              <h6> visa number: 4242 4242 4242 4242 </h6>
              <h6>expire date :04/24</h6>
              <h6>CVC: 242</h6>
              <h6> zip: 42424</h6>
            </div>
            {/* Stripe magic */}
            <form onSubmit={handleSubmit} action="">
              <CardElement onChange={handleChange} />
              <div className="payment_price_container">
                <CurrencyFormat
                  renderText={(value: any): JSX.Element => (
                    <>
                      <p>
                        Order Total: <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || succeeded || disabled} className="product_button">
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
