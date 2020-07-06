import React from "react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./snippet-item.module.css"

function SnippetItem({ title, link, type, id }) {
  const snippeturl = `/collections/${id}`;
  return (
    <tr className={styles.row}>
      <td>{title}</td>
      <td>
        <a href={link}>{link}</a>
      </td>
      <td>{type}</td>
      <td>
        <a href={snippeturl}>
          <FontAwesomeIcon
            icon={faBookmark}
            size="lx"
            style={{ color: "white" }}
          />
        </a>
      </td>
    </tr>
  );
}

export default SnippetItem;
