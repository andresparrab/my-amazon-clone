import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RoutingPaths from "./RoutingPaths";
import HomeView from "../views/homeView/HomeView";
import BasketView from "../views/basketview/BasketView";
import LoginView from "../views/loginView/LoginView";
import CheckoutView from "../views/checkoutView/CheckoutView";
import OrdersView from "../views/ordersView/OrdersView";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Ho3r8JvugdMxF8ptK82mSnk4hsk8ZrRKTMzIQNvBN3rjOBNLOgaw6Pltydw0AVgoTQIritC5oUxsOwqN4W1fbJ900aesaPkpU"
);

export const Routing = (props: any): JSX.Element => {
  return (
    <Router>
      {/*in this case the props children are the sub elements from App.js <Routing></Routing>*/}
      {props.children}

      <Switch>
        <Route exact path={RoutingPaths.BasketView} component={BasketView}></Route>

        <Route exact path={RoutingPaths.LoginView} component={LoginView}></Route>
        <Route exact path={RoutingPaths.OrdersView} component={OrdersView}></Route>

        <Route exact path={RoutingPaths.CheckoutView}>
          <Elements stripe={promise}>
            <CheckoutView />
          </Elements>
        </Route>

        <Route component={HomeView} />
      </Switch>
    </Router>
  );
};
