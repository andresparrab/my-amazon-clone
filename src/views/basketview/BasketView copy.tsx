import React from "react";
import Subtotal from "../../components/subtotal/Subtotal";
import "./BasketView.css";
import { useStateValue } from "../../components/shared/provider/StateProvider";
import Basket from "../../components/basket/Basket";

const BasketView = (): JSX.Element => {
  const [{ basket }, dispatch] = useStateValue();

  const basketItems = basket.map((Item: any) => {
    return (
      // <>
      <div className="basket_product">
        <div className="basket_img">
          <img src={Item.image} alt="immmg" />
        </div>

        <div className="basket_info">
          <div className="basket_item_title">
            <p>{Item.title}</p>

            <p className="basket_price">
              <small>$</small>
              <strong>{Item.price}</strong>
            </p>
            <div className="basket_rating">
              {Array(Item.rating)
                .fill(null)
                .map((_, i: number) => (
                  <p className="_basket_star">★</p>
                ))}
            </div>
            <div>
              <button className="basket_button">Remove from basket</button>
            </div>
          </div>
        </div>
        {/* <div className="product_img">
          <img src={Item.image} alt="immmg" />
        </div>
        <div>
          <button className="product_button">Remove from basket</button>
        </div> */}
      </div>
    );

    // console.log("Basket object inside", Item.image);
  });
  console.log("Basket object", basketItems);

  return (
    <div className="basket_wrapper">
      <div className="basket_left">
        <img
          className="basket_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h2 className="basket_title">Your shooping basket</h2>
        </div>
        {/* {Basket()} */}
        {/* {basketItems} */}
      </div>
      <div className="basket_right">
        <Subtotal />
      </div>
    </div>
  );
};
export default BasketView;
