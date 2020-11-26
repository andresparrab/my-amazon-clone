import React from "react";
import { useStateValue } from "../../components/shared/provider/StateProvider";

const Basket = (): any => {
  const [{ basket }, dispatch] = useStateValue();

  const basketItems2 = basket.map(
    (Item: any): JSX.Element => {
      const id = Item.id;

      const RemoveFromBasket = (props: any) => {
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
                <button className="basket_button" onClick={RemoveFromBasket}>
                  Remove from basket
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

  return basketItems2;
};
export default Basket;
