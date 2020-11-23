import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../components/shared/provider/firebase";
import "./LoginView.css";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e: any) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
    console.log("email and passwprd here: ", email, password);
  };

  const register = (e: any) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
        console.log(auth);
      })
      .catch((error) => alert(error.message));
    console.log("email and passwprd here: ", email, password);
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="amazon_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="img"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>
        <form>
          <label>
            <h5>Email:</h5>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <h5>Password</h5>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={signIn} className="product_button">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <h6 className="new_amazon">New to Amazon?</h6>

        <button className="product_button register" onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};
export default LoginView;
