import React, { useState } from "react";
import Basket from "../basket/Basket";
import moment from "moment";
import "./Order.css";
import Product from "../products/Product";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Orders = (order: any) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.order?.data?.created).format("MMMM do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.order?.id}</small>
      </p>

      <p className="order_amount">
        Order Total: $<small>{order.order?.data?.amount / 100}</small>
      </p>

      <div className="order_products">
        {order.order?.data?.basket.map((orderproduct: any) => (
          <Product
            id={orderproduct.id}
            title={orderproduct?.title}
            price={orderproduct?.price}
            rating={orderproduct?.rating}
            image={orderproduct?.image}
            hideButton={true}
          />
        ))}
      </div>
    </div>
  );
};
export default Orders;
