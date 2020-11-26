/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { db } from "../../components/shared/provider/firebase";
import { useStateValue } from "../../components/shared/provider/StateProvider";
import Order from "../../components/orders/Order";
import "./OrdersView.css";

interface StateProperties {
  id: string;
  data: any;
}

const OrdersView = () => {
  const [orders, setOrders] = useState<StateProperties[]>([]);
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          return setOrders(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((
          order //Goes trough every order from the  database ans sen it to Order.tsx
        ) => (
            <Order order={order} />
          ))}
        {/* <Order order={orders} /> */}
      </div>
    </div>
  );
};
export default OrdersView;
