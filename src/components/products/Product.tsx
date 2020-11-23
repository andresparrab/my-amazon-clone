import { ContactSupportOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useNotification } from "../notifications/NotificationProvider";
import { useStateValue } from "../shared/provider/StateProvider";
import "./Produc.css";
useNotification;

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
  // const [iteml, setIteml] = useState(0);

  //hideButton = false;

  const addToBasket = (): any => {
    // dispatch the item into the data layer

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

    // dispatchNote({
    //   type: "SUCCESS",
    //   // message: "Itemaaa added to basket",
    //   message: "basket[ItemLenght + 1].id,",
    // });
  };

  const notifi = () => {
    // ASK TEACHER HOW I CAN GET THE FIRST ITEM, AND THE LAST ITEM
    dispatchNote({
      type: "SUCCESS",
      // message: basket[basket.length - 1].title,
      message: basket.length + 1,
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
            {/* <button onClick={notifi}>notifi</button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;