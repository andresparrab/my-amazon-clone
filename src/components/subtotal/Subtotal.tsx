import React from "react";
import "./Subtotal.css";
import "../shared/global/global.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../shared/provider/StateProvider";
import { getBasketTotal } from "../shared/provider/Reducer";
import { useHistory } from "react-router-dom";

const Subtotal = (): JSX.Element => {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: any): JSX.Element => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift!!
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
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
