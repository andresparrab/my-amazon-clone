import React, { useEffect, useState } from "react";
import "./Notification.css";
export const Notification = (props: any): JSX.Element => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID]: [
    null | NodeJS.Timeout,
    (interval: null | NodeJS.Timeout) => void
  ] = useState<null | NodeJS.Timeout>(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id); // This will stop and clear the interval, if not it will loop 100 all the time
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(Number(intervalID));
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 900);
  };

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      // eslint-disable-next-line prettier/prettier
      className={`notification_item ${props.type === "SUCCESS" ? "success" : "error"} ${exit ? "exit" : ""
        // eslint-disable-next-line prettier/prettier
        }`}
    >
      <h4 className="notification_title"> Added to basket </h4>
      <div className="itemInfo">
        <img className="itemSmall" src={props.image} />
        <p>{props.message}</p>
      </div>
      <div className="bar" style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
