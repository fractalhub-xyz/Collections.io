import React from "react";
import { AccountCircle, Check, Comment, GroupAdd, LabelOff, Launch, PlaylistAdd, Star, VerifiedUser } from "@material-ui/icons";
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
      notification.type_of === "PERMISSION_GRANTED" ||
      notification.type_of === "FOLLOWER_INTERACT"
    ) {
      history.push(`/collection/${notification.identifier}`);
    } else if (notification.type_of === "PERMISSION_REVOKED") {
      alert("You no longer have permission to access this collection");
    } else if (
      notification.type_of === "SNIPPET_CREATED" ||
      notification.type_of === "COMMENT_CREATED"
    ) {
      history.push(`/snippet/${notification.identifier}`);
    } else if (notification.type_of === "NEW_FOLLOWER") {
      history.push(`/user/${notification.subtitle.split()[0]}`);
    } else {
      alert("not defined yet :(");
    }
  };

  const type = notification.type_of;

  return (
    <div className="notification">
      <div className="left">
        {type === "USER_FOLLOWED" ? (
          <div className="icon center c3">
            {" "}
            <Star />
          </div>
        ) : type === "PERMISSION_GRANTED" ? (
          <div className="icon center c6">
            {" "}
            <VerifiedUser />
          </div>
        ) : type === "PERMISSION_REVOKED" ? (
          <div className="icon center c1">
            {" "}
            <LabelOff />
          </div>
        ) : type === "SNIPPET_CREATED" ? (
          <div className="icon center c4">
            {" "}
            <PlaylistAdd />
          </div>
        ) : type === "COMMENT_CREATED" ? (
          <div className="icon center c5">
            {" "}
            <Comment />
          </div>
        ) : type === "NEW_FOLLOWER" ? (
          <div className="icon center c2">
            {" "}
            <AccountCircle />
          </div>
        ) : type === "FOLLOWER_INTERACT" ? (
          <div className="icon center c7">
            {" "}
            <GroupAdd />
          </div>
        ) : null}
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
