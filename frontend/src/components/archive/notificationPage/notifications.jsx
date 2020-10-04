import React, { useState, useEffect } from "react";
//components
import Navbar from "../detailPage/navbar";
//API
import { getNotifications, postReadNotification } from "../../helpers/api";
//CSS
import "./notification.css";
//Modules
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
//Componetns
import Notification from "./notification";

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
    <div className="root">
      <div className="main">
        <Navbar />

        {error ? (
          <h4>{error}</h4>
        ) : isLoading ? (
          <div className="loader">
            <Loader
              type="Grid"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <div className="container">
            <h1>
              {
                notifications.filter(function (notifications) {
                  return notifications.is_read == false;
                }).length
              }{" "}
              New notifications !
            </h1>
            <div>
              <h3>Unread</h3>
              {notifications.map((notification) => (
                <div key={notification.id}>
                  {notification.is_read == false && (
                    <Notification
                      notification={notification}
                      setRefresh={setRefresh}
                      read={true}
                    />
                  )}
                </div>
              ))}
              <h3>Others</h3>
              {notifications.map((notification) => (
                <div key={notification.id}>
                  {notification.is_read == true && (
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
        )}
      </div>
    </div>
  );
}

export default Notifications;
