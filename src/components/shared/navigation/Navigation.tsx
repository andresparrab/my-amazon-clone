import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../provider/firebase";

const Navigation = (): JSX.Element => {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log("Andres is the best!!!")

  const signOut = () => {
    if (auth) {
      auth.signOut();
    }
  };

  return (
    <div className="navigation">
      {/* logo */}
      <Link to="/">
        <img
          className="navigation_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="img"
        />
      </Link>
      <div className="navigation_search">
        <input className="navigation_searchInput" type="text" />

        <SearchIcon className="navigation_searchIcon"></SearchIcon>
      </div>

      <div className="navigation_nav">
        <Link to={!user && "/login" ? "/login" : "/"}>
          <div className="navigation_option" onClick={signOut}>
            <span className="navigation_optionLineOne">
              {user ? user?.email.split("@", 1)[0] : "Hello, "}
            </span>

            <span className="navigation_optionLineTwo">{user ? "Sign out" : "Sign In"}</span>
          </div>
        </Link>

        <Link to={!user && "/login" ? "/" : "/orders"}>
          <div className="navigation_option">
            <span className="navigation_optionLineOne">Returns</span>
            <span className="navigation_optionLineTwo"> & orders</span>
          </div>
        </Link>

        <div className="navigation_option">
          <span className="navigation_optionLineOne">Your </span>
          <span className="navigation_optionLineTwo">Prime</span>
        </div>
        <Link to="/basket">
          <div className="navigation_optionBasket">
            <ShoppingBasketIcon />
            <span className="navigation_optionLineTwo navigation_BasketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navigation;
