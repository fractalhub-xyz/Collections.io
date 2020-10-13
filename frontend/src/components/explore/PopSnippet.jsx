import React from "react";
import "./explore.sass";
//icons
import { Mic, Description, Link, Movie } from "@material-ui/icons";
//modules
import { useHistory } from "react-router-dom";

function PopSnippet({ snippet }) {
  let history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/snippet/${snippet.id}`);
      }}
      className={
        snippet.type_of === "podcast"
          ? "pop-snippet c4"
          : snippet.type_of === "article"
          ? "pop-snippet c2"
          : snippet.type_of === "video"
          ? "pop-snippet c3"
          : snippet.type_of === "link"
          ? "pop-snippet c1"
          : null
      }
    >
      {snippet.type_of === "podcast" && (
        <div className="mat-icon center">
          <Mic fontSize="default" />
        </div>
      )}
      {snippet.type_of === "article" && (
        <div className="mat-icon center">
          <Description fontSize="default" />
        </div>
      )}
      {snippet.type_of === "video" && (
        <div className="mat-icon center">
          <Movie fontSize="default" />
        </div>
      )}
      {snippet.type_of === "link" && (
        <div className="mat-icon center">
          <Link fontSize="default" />
        </div>
      )}
      <div className="title">{snippet.title}</div>
    </div>
  );
}

export default PopSnippet;

// <div
//         className="card"
//         onClick={() => {
//           history.push(`/snippet/${snippet.id}`);
//         }}
//       >
//         {snippet.type_of === "podcast" && (
//           <div className="mat-icon center c4">
//             <Mic fontSize="default" />
//           </div>
//         )}
//         {snippet.type_of === "article" && (
//           <div className="mat-icon center c2">
//             <Description fontSize="default" />
//           </div>
//         )}
//         {snippet.type_of === "video" && (
//           <div className="mat-icon center c3">
//             <Movie fontSize="default" />
//           </div>
//         )}
//         {snippet.type_of === "link" && (
//           <div className="mat-icon center c1">
//             <Link fontSize="default" />
//           </div>
//         )}
//         <div className="info">
//           <div className="name">{snippet.title}</div>
//           <div className="owner">by {snippet.owner}</div>
//         </div>
//         <div className="likes">
//           <Favorite />
//         </div>
//       </div>
