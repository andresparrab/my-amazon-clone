import Notifications from "./Notification";
import "./NotificationProvider.css";
import { v4 } from "uuid";
import React, { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext<any | null>(null);

export const NotificationProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "ADD_NOTIFICATION":
          return [...state, { ...action.payload }];
        case "REMOVE_NOTIFICATION":
          return state.filter((el: any) => el.id !== action.id); // this returns an array
        default:
          return state;
      }
    },
    []
    // [{ id: v4(), type: "SUCCESS", message: "HELLOS WOLRD" }]
  );

  //console.log("THIS ARE NOTIFOCATIONS: ", notifications);
  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notification_wrapper">
        {state.map((note: any) => {
          return <Notifications dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      <div>{props.children}</div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props: any) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
