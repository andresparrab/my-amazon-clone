import React from "react";
//import FlipMove from "react-flip-move";
//import Subtotal from "../../components/subtotal/Subtotal";
// import "./BasketView.css";
import { useStateValue } from "../../components/shared/provider/StateProvider";
import Product from "../products/Product";
// const Basket = (hideButton: any): any => {
const Basket = (): any => {
  const [{ basket }, dispatch] = useStateValue();

  const basketItems2 = basket.map(
    (Item: any): JSX.Element => {
      console.log("THIS IS THE ID:", Item.id);
      const id = Item.id;
      console.log("this is the basket id before remove function.......: ", id);
      const RemoveFromBasket = (props: any) => {
        console.log("this is the basket id inside RemoveFromBasket.......: ", id);
        // console.log("this is the hidebutton.......: ", hideButton);
        dispatch({
          type: "REMOVE_FROM_BASKET",
          id: id,
        });
      };
      return (
        <div className="basket_product">
          <div className="basket_img">
            <img src={Item.image} alt="img" />
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
                {/* {!hideButton && ( */}
                <button className="basket_button" onClick={RemoveFromBasket}>
                  Remove from basket
                </button>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

  // return <FlipMove>{basketItems2}</FlipMove>;

  return basketItems2;
};
export default Basket;
