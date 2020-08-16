import React from "react";
import { postReadNotification } from "../../helpers/api";
//MODULES
import { useHistory } from "react-router-dom";

function Notification({ notification, setRefresh, read }) {
  let history = useHistory();

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

  const redirect = () => {
    if (
      notification.type_of === "USER_FOLLOWED" ||
      notification.type_of === "PERMISSION_GRANTED"
    ) {
      history.push(`detail/${notification.identifier}`);
    } else if (notification.type_of === "PERMISSION_REVOKED") {
      alert("You no longer have permission to access this collection");
    } else if (notification.type_of === "SNIPPET_CREATED") {
      alert("need collection id to redirect to snippet");
    } else {
      alert("not defined yet :(");
    }
  };

  return (
    <div className="notification">
      <h3>{notification.title}</h3>
      <h4>{notification.subtitle}</h4>
      {notification.type_of !== "PERMISSION_REVOKED" && (
        <button onClick={redirect}>Open</button>
      )}
      {read && <button onClick={markAsRead}>Mark as Read</button>}
    </div>
  );
}

export default Notification;
