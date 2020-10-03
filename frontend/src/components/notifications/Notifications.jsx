import React, { useState, useEffect } from "react";
import "./notifications.sass";
//components
import Notification from "./notification";
//api
import { getNotifications } from "../../helpers/api";

function Notifications() {
  //states
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(true);

  //lifcycle funcs
  useEffect(() => {
    if (!refresh) {
      return;
    }
    console.log("rendering Notification View");
    async function fetchNotifications() {
      try {
        console.log(`fetching notifications`);
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
        setError(`Failed to fetch Notifications`);
      }
      setIsLoading(false);
    }
    fetchNotifications();
    setRefresh(false);
  }, [refresh]);

  return (
    <main className="notifications">
      <div className="container">
        <h2>NOTIFICATIONS</h2>
        <h1>
          {
            notifications.filter(function (notifications) {
              return notifications.is_read === false;
            }).length
          }{" "}
          new!
        </h1>
        <div className="all">
          <h3>Unread</h3>
          {notifications.reverse().map((notification) => (
            <div key={notification.id}>
              {notification.is_read === false && (
                <Notification
                  notification={notification}
                  setRefresh={setRefresh}
                  read={true}
                />
              )}
            </div>
          ))}
          <h3>Others</h3>
          {notifications.reverse().map((notification) => (
            <div key={notification.id}>
              {notification.is_read === true && (
                <Notification
                  notification={notification}
                  setRefresh={setRefresh}
                  read={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="logo">COLLECTIONS</div>
    </main>
  );
}

export default Notifications;
