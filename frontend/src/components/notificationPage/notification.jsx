import React from "react";
import { postReadNotification } from "../../helpers/api";

function Notification({ notification, setRefresh, read }) {
  const markAsRead = async (e) => {
    e.preventDefault();
    try {
      await postReadNotification(notification.id);
      setRefresh(true);
    } catch {
      console.log("Failed to delete");
      alert("Failed");
    }
  };
  return (
    <div className="notification">
      <h3>{notification.title}</h3>
      <h4>{notification.subtitle}</h4>
      {read && <button onClick={markAsRead}>Mark as Read</button>}
    </div>
  );
}

export default Notification;
