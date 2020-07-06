import React from "react";

function SnippetItem({ title, link }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{link}</td>
      <td>TEST</td>
    </tr>
  );
}

export default SnippetItem;
