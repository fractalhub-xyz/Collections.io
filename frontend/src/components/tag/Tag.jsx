import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./tag.sass";
//API
import { getCollectionsFromTag } from "../../helpers/api";
import Tag2Collection from "./tag2Collection";

function Tag() {
  let history = useHistory();
  let params = useParams();

  const [tag, setTag] = useState(params.tagname);
  const [collections, setCollections] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTag(params.tagname);
    setRefresh(true);
  }, [params]);

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering Tag View");
    if (!refresh) {
      return;
    }
    async function fetchTagInfo() {
      try {
        console.log(`fetching collections with tag ${tag}`);
        const response = await getCollectionsFromTag(tag);
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError(`Failed to load collections with tag ${tag}`);
      }
      setIsLoading(false);
    }
    fetchTagInfo();
    setRefresh(false);
  }, [refresh, tag]);

  return (
    <div className="tag-page">
      <h1>#{tag}</h1>
      <div className="tag2collections">
        {collections.map((collection) => (
          <Tag2Collection key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}

export default Tag;
