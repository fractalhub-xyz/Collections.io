import React from "react";
import { Check, Launch, Star } from "@material-ui/icons";
import { postReadNotification } from "../../helpers/api";
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
      history.push(`/collection/${notification.identifier}`);
    } else if (notification.type_of === "PERMISSION_REVOKED") {
      alert("You no longer have permission to access this collection");
    } else if (notification.type_of === "SNIPPET_CREATED") {
        history.push(`/snippet/${notification.identifier}`);
    } else {
      alert("not defined yet :(");
    }
  };

  return (
    <div className="notification">
      <div className="left">
        <div className="icon center">
          <Star />
        </div>
        <div className="info">
          <div className="title">{notification.title}</div>
          <div className="subtitle">{notification.subtitle}</div>
        </div>
      </div>
      <div className="right">
        <Launch className="ico" onClick={redirect} />
        {read && <Check className="ico" onClick={markAsRead} />}
      </div>
    </div>
  );
}

export default Notification;
