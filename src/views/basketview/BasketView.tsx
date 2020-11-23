import React from "react";
import Subtotal from "../../components/subtotal/Subtotal";
import "./BasketView.css";
import { useStateValue } from "../../components/shared/provider/StateProvider";
import Basket from "../../components/basket/Basket";
//import Product from "../../components/products/Product";
import { auth } from "../../components/shared/provider/firebase";
import FlipMove from "react-flip-move";

const BasketView = (): JSX.Element => {
  const [{ basket, user }, dispatch] = useStateValue();
  // const hideButton = false;
  return (
    <div className="basket_wrapper">
      <div className="basket_left">
        <img
          className="basket_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3 className="basket_user">Hello, {user?.email.split(".", 1)[0]}</h3>
          <h2 className="basket_title">Your shooping basket</h2>
        </div>
        {/* {Basket(hideButton)} */}
        <FlipMove verticalAlignment="top" enterAnimation="elevator" leaveAnimation="elevator">
          {Basket()}
        </FlipMove>
      </div>
      <div className="basket_right">
        <Subtotal />
      </div>
    </div>
  );
};
export default BasketView;
