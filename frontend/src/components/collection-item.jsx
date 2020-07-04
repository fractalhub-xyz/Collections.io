import React from "react";

function CollectionItem({ name, owner, snippets }) {
  return (
    <div>
      <hr />
      Name: {name}
      <br />
      CreatedBy: {owner}
      <br />
      Snippets:
      <br />
      {snippets.map((snippet) => (
        <div>
          Title: {snippet.title} | Link: {snippet.link}
        </div>
      ))}
      <hr />
    </div>
  );
}

export default CollectionItem;
