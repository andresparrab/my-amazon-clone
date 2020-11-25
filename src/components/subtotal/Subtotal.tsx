import React from "react";
import "./Subtotal.css";
import "../shared/global/global.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../shared/provider/StateProvider";
import { getBasketTotal } from "../shared/provider/Reducer";
import { useHistory } from "react-router-dom";
//import Basket from "../../components/basket/Basket";
const Subtotal = (): JSX.Element => {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  console.log("THIS IS INSIDE SUBTOTAL BASKET:", basket);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: any): JSX.Element => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift!!
            </small>
          </>
        )}
        decimalScale={2}
        //value={0}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button className="product_button" onClick={(e: any) => history.push("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
};
export default Subtotal;
