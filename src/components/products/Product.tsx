// import { ContactSupportOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useNotification } from "../notifications/NotificationProvider";
import { useStateValue } from "../shared/provider/StateProvider";
import "./Produc.css";

const Product = ({
  title,
  price,
  rating,
  image,
  id,
  hideButton,
}: {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  hideButton?: boolean;
}): JSX.Element => {
  const dispatchNote = useNotification();
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (): any => {
    //dispatch the item into the data layer

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  const notifi = () => {
    dispatch({
      type: "DEFAULT",
    });

    dispatchNote({
      type: "SUCCESS",
      image: image,
      message: title.substr(0, 27),
    });
  };

  const onClickAction = () => {
    addToBasket();
    notifi();
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">
          {Array(rating)
            .fill(null)
            .map((_, i: number) => (
              <p className="_product_star">★</p>
            ))}
        </div>
      </div>
      <div className="product_img">
        <img src={image} alt="product_image" />
      </div>

      <div>
        {!hideButton && (
          <div>
            <button className="product_button" onClick={onClickAction}>
              Add to basket
            </button>
            {/* {notifi} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
