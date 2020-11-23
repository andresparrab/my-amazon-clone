import React, { useEffect } from "react";
import { Routing } from "./routes/Routing";
import "./App.css";
import Navigation from "./components/shared/navigation/Navigation";
import { auth } from "./components/shared/provider/firebase";
import { useStateValue } from "./components/shared/provider/StateProvider";

function App(): JSX.Element {
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is:...>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Routing>
      <Navigation />
    </Routing>
  );
}

export default App;
