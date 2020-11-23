import React, { useState } from "react";

const Basket = (): JSX.Element => {
  const [baskedItemsCount, setBaskedItemsCount] = useState(0);
  const AddtoBasket = () => {
    setBaskedItemsCount(baskedItemsCount + 1);
    console.log(`${baskedItemsCount} items added to the basket`);
  };

  return <div>baskedItemsCount</div>;
};
export default Basket;
