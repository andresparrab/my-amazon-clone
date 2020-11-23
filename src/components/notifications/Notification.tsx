import React, { useEffect, useState } from "react";

export const Notification = (props: any): JSX.Element => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID]: [
    null | NodeJS.Timeout,
    (interval: null | NodeJS.Timeout) => void
  ] = useState<null | NodeJS.Timeout>(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      console.log("this is INSIDE ID---<<<< ", id);
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
      className={`notification_item ${props.type === "SUCCESS" ? "success" : "error"} ${
        exit ? "exit" : ""
      }`}
    >
      <h4 className="notification_titlee">Number of item(s) added: </h4>
      <p>{props.message}</p>

      <div className="bar" style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;