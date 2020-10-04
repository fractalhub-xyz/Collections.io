import React from "react";
import "./explore.sass";
//icons
import { Favorite, Mic, Description, Link, Movie } from "@material-ui/icons";
//modules
import { useHistory } from "react-router-dom";

function PopSnippet({ snippet }) {
  let history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/snippet/${snippet.id}`);
      }}
      className="pop-snippet"
    >
      {snippet.type_of === "podcast" && (
        <div className="mat-icon center c4">
          <Mic fontSize="medium" />
        </div>
      )}
      {snippet.type_of === "article" && (
        <div className="mat-icon center c2">
          <Description fontSize="medium" />
        </div>
      )}
      {snippet.type_of === "video" && (
        <div className="mat-icon center c3">
          <Movie fontSize="medium" />
        </div>
      )}
      {snippet.type_of === "link" && (
        <div className="mat-icon center c1">
          <Link fontSize="medium" />
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
//             <Mic fontSize="medium" />
//           </div>
//         )}
//         {snippet.type_of === "article" && (
//           <div className="mat-icon center c2">
//             <Description fontSize="medium" />
//           </div>
//         )}
//         {snippet.type_of === "video" && (
//           <div className="mat-icon center c3">
//             <Movie fontSize="medium" />
//           </div>
//         )}
//         {snippet.type_of === "link" && (
//           <div className="mat-icon center c1">
//             <Link fontSize="medium" />
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
