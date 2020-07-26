import React, { useState, useEffect } from "react";
import "./detail.css";
import SideNav from "../homePage/sidenav";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import NewSnippet from "./newsnippet";
//API
import { getCollectionFromID } from "../../helpers/api";
import { postFollowCollection } from "../../helpers/api";
//components
import Snippet from "./snippet";
import EditCollection from "./editcollection";
import AddTag from "./addtag";
//modules
import ReactTooltip from "react-tooltip";
import { randomColor } from "randomcolor";
import { useHistory } from "react-router-dom";
//ICONS
import {
  faHeart,
  faPlusCircle,
  faUserEdit,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Detail() {
  // params
  const params = useParams();
  const [id, setID] = useState(params.id);
  let history = useHistory();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [modalView, setModalView] = useState(false);
  const [editCollectionModal, setEditCollectionModal] = useState(false);
  const [tagsModal, setTagsModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [totLikes, setTotLikes] = useState(0);
  const [totFollowers, setTotFollowers] = useState(0);

  //utitlity funcs
  const color = randomColor({
    luminosity: "light",
    hue: "blue",
  });

  const mystyle = {
    background: "#31004a",
  };

  useEffect(() => {
    setID(params.id);
    setRefresh(true);
  }, [params]);

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering Detail View");
    if (!refresh) {
      return;
    }

    async function fetchCollection() {
      try {
        console.log(`fetching collection ${id} details`);
        const response = await getCollectionFromID(id);
        setCollection(response.data);
        setSnippets(response.data.snippets);
        setTags(response.data.tags);
      } catch (error) {
        console.error(error);
        setError(`Failed to load collection with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchCollection();
    setRefresh(false);
  }, [refresh, id]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === collection.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    const followers = collection.followers;
    if (followers) {
      setIsFollowed(followers.includes(user));
      setTotFollowers(collection.followers.length);
    }
  }, [collection]);

  useEffect(() => {
    var len = snippets.length;
    var likes = 0;
    for (var i = 0; i < len; i++) {
      likes = likes + snippets[i].hearts.length;
    }
    setTotLikes(likes);
  }, [snippets]);

  //functions
  const followCollection = async (e) => {
    e.preventDefault();
    try {
      const response = await postFollowCollection(collection.id);
      setIsFollowed(response.data.followed);
      if (response.data.success === true) {
        if (response.data.followed === true) {
          setTotFollowers(totFollowers + 1);
        } else {
          setTotFollowers(totFollowers - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const podcasts = snippets.filter((snip) => snip.type_of === "podcast").length;
  const articles = snippets.filter((snip) => snip.type_of === "article").length;

  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar />
        {error ? (
          <div className="loading-error">{error}</div>
        ) : (
          <div className="container">
            <div className="cardDetails">
              <div className="collectioncard" style={mystyle}>
                {collection.name}
              </div>
              <div className="collectionText">
                <div className="likes">
                  {totLikes} HEARTS, {totFollowers} FOLLOWERS
                </div>
                <div>
                  <FontAwesomeIcon
                    data-tip={
                      isFollowed ? "Unfollow Collection" : "Follow Collection"
                    }
                    data-type="warning"
                    onClick={followCollection}
                    className={isFollowed ? "like teal" : "like"}
                    icon={faHeart}
                  />
                </div>
                <div className="type">
                  COLLECTION created by{" "}
                  <span className="teal">{collection.owner}</span>
                  <div className="count">
                    {articles} Articles, {podcasts} Podcast, {snippets.length}{" "}
                    Total
                  </div>
                </div>
                <div className="name">{collection.name}</div>
                <div className="desc">{collection.desc}</div>
                <div>
                  <span>
                    {tags.map((tag) => (
                      <button
                        onClick={() => {
                          history.push(`/tag/${tag}`);
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </span>
                  <FontAwesomeIcon
                    className="add-tag-button"
                    data-tip="Add Tag"
                    data-type="dark"
                    icon={faPlusCircle}
                    onClick={() => {
                      setTagsModal(true);
                    }}
                  />
                </div>
              </div>
              <div>
                {isOwner && (
                  <FontAwesomeIcon
                    onClick={() => {
                      setEditCollectionModal(true);
                    }}
                    data-tip="Edit Collection"
                    className="deleteIcon"
                    icon={faUserEdit}
                  />
                )}
              </div>
            </div>
            <input
              placeholder="SEARCH"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value, searchText);
              }}
            />
            <FontAwesomeIcon
              data-tip="add snippet"
              data-type="info"
              onClick={() => {
                setModalView(true);
              }}
              className="addSnippet"
              icon={faPlusCircle}
            />
            <div className="tableheaders">
              <div className="likecol">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="titlecol">TITLE</div>
              <div className="likescol">HEARTS</div>
              <div className="ownercol">OWNER</div>
              <div className="typecol">TYPE</div>
              <div className="datecol">CREATED ON</div>
              <div className="linkcol">LINK</div>
              <div className="edicol">EDIT</div>
            </div>

            <div
              className={
                !searchText.length ? "snippetList" : "snippetList dispnone"
              }
            >
              {isLoading && <div className="loader">ISA LOADING</div>}
              {!snippets.length && (
                <h4 className="oops">
                  ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
                  <br />
                  ISA EMPTY
                </h4>
              )}
              {snippets.map((snippet) => (
                <Snippet
                  key={snippet.id}
                  snippet={snippet}
                  setRefresh={setRefresh}
                  collectionName={collection.name}
                />
              ))}
            </div>
            <div
              className={
                !!searchText.length ? "snippetList" : "snippetList dispnone"
              }
            >
              {isLoading && <div className="loader">ISA LOADING</div>}
              {!snippets.length && (
                <h4 className="oops">
                  ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
                  <br />
                  ISA EMPTY
                </h4>
              )}
              {snippets.map((snippet) => (
                <div key={snippet.id}>
                  {snippet.title.includes(searchText) && (
                    <Snippet
                      snippet={snippet}
                      setRefresh={setRefresh}
                      collectionName={collection.name}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {modalView && (
          <NewSnippet
            setModalView={setModalView}
            collection={collection}
            setRefresh={setRefresh}
          />
        )}
      </div>
      <div>
        {editCollectionModal && (
          <EditCollection
            setEditCollectionModal={setEditCollectionModal}
            setRefresh={setRefresh}
            collection={collection}
          />
        )}
      </div>
      <div>
        {tagsModal && (
          <AddTag
            setTagsModal={setTagsModal}
            collection={collection}
            setRefresh={setRefresh}
          />
        )}
      </div>
      <ReactTooltip />
    </div>
  );
}

export default Detail;
