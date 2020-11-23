import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./Reducer";

// Prepares the dataLayer
export const StateContext = createContext({});

// Wrap our app and provide the Data layer
export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: any;
  initialState: any;
  children: any;
}): JSX.Element => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = (): any => useContext(StateContext);