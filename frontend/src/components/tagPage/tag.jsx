import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import SideNav from "../homePage/sidenav";
import Navbar from "../detailPage/navbar";

//API
import { getCollectionsFromTag } from "../../helpers/api";
function Tag() {
  // params
  const params = useParams();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [collections, setCollections] = useState([])

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering Tag View");
    if (!refresh) {
      return;
    }

    async function fetchTagInfo() {
      try {
        const tag = params.tag;
        console.log(`fetching collections with tag ${tag}`);
        const response = await getCollectionsFromTag(tag);
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError(`Failed to load collections with tag ${params.tag}`);
      }
      setIsLoading(false);
    }
    fetchTagInfo();
    setRefresh(false);
  }, [refresh]);


  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar />
        {error ? (
          <div className="loading-error">{error}</div>
        ) : (
          <div className="container">
            {collections.map(collection => <div>{collection.name}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tag;
