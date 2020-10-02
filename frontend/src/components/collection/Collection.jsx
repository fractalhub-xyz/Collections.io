import React, { useState, useEffect } from "react";
import "./collection.sass";
//api
import { getCollectionFromID, postFollowCollection } from "../../helpers/api";
//components
import SnippetRow from "./snippetRow";
import { isMobile } from "react-device-detect";
//icons
import {
  Favorite,
  Link,
  Mic,
  Movie,
  PlaylistAdd,
  Search,
  Description,
  Loyalty,
  Create,
  Security,
  NotInterested,
} from "@material-ui/icons";

//modules
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Collection() {
  //states
  const [collection, setCollection] = useState({});
  const [colid, setColid] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  let history = useHistory();
  //misc
  const [totFollowers, setTotFollowers] = useState(0);

  //flags
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };

  //global states
  const [{ refresh }, dispatch] = useStateValue();
  const params = useParams();
  const user = localStorage.getItem("user");

  useEffect(() => {
    setColid(params.id);
    dispatch({
      type: "REFRESH",
      refresh: true,
    });
  }, [params, dispatch]);

  // lifecycle functions
  useEffect(() => {
    console.log("[RENDER] >> Collection");
    if (!refresh) {
      return;
    }
    async function fetchCollection() {
      try {
        console.log(`[GET] >> Collection ${params.id} details`);
        const response = await getCollectionFromID(params.id);
        setCollection(response.data);
        setSnippets(response.data.snippets);
        setTags(response.data.tags);
      } catch (error) {
        console.error(error.response.data);
        setGetError(`Failed to load collection with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchCollection();
    dispatch({
      type: "REFRESH",
      refresh: false,
    });
  }, [refresh, colid, params, dispatch]);

  useEffect(() => {
    if (user === collection.owner) {
      setIsOwner(true);
      setIsWhitelist(true);
    }
    if (collection.permission === "all") {
      setIsWhitelist(true);
    }
    if (collection.allowed_users) {
      if (collection.allowed_users.includes(user)) {
        setIsWhitelist(true);
      }
    }
    const followers = collection.followers;
    if (followers) {
      //check
      setIsFollowed(followers.includes(user));
      //
      setTotFollowers(collection.followers.length);
    }
    if (collection.tags) {
      if (collection.tags[0]) {
        console.log("tag", collection.tags[0]);
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection, user]);

  //functions
  const followCollection = async (e) => {
    e.preventDefault();
    try {
      const response = await postFollowCollection(collection.id);
      setIsFollowed(response.data.followed);
      console.log(response.data.followed);
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
  const links = snippets.filter((snip) => snip.type_of === "link").length;
  const videos = snippets.filter((snip) => snip.type_of === "video").length;

  return (
    <div>
      {!isMobile ? (
        <main className="collection">
          <header>
            <div className="card" style={coll_bg}></div>
            <div className="info">
              <div className="type">COLLECTION</div>
              <div className="name">{collection.name}</div>
              <div className="desc">{collection.desc}</div>
              <div className="tags">
                <div className="hash">
                  <Loyalty />
                </div>
                {tags.map((tag) => (
                  <div
                    className="tag"
                    key={tags.id}
                    onClick={() => {
                      history.push(`/tag/${tag.name}`);
                    }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <div className="btn center" onClick={followCollection}>
                {isFollowed ? <p>UNFOLLOW</p> : <p>FOLLOW</p>}
                <Favorite className={isFollowed ? "followed" : ""} />
              </div>
            </div>
            <div className="col3">
              <div
                className="owner"
                onClick={() => {
                  history.push(`/user/${collection.owner}`);
                }}
              >
                {collection.owner}
              </div>
              <div className="btns">
                {collection.owner === user && (
                  <div
                    className="ctrl-btn center"
                    onClick={() => {
                      dispatch({
                        type: "OPEN_FORM",
                        form: "edit_permissions",
                        id: collection.id,
                        prefill_data: {
                          allowed_users: collection.allowed_users,
                          permission: collection.permission,
                        },
                      });
                    }}
                  >
                    <Security />
                  </div>
                )}
                {collection.owner === user && (
                  <div
                    className="ctrl-btn center"
                    onClick={() => {
                      dispatch({
                        type: "OPEN_FORM",
                        form: "edit_collection",
                        id: collection.id,
                        prefill_data: {
                          form_data: {
                            name: collection.name,
                            desc: collection.desc,
                          },
                          visibility: collection.visibility,
                        },
                      });
                    }}
                  >
                    <Create />
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className="mid">
            <div className="searchsection">
              <div className="searchbox">
                <Search />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </div>
              <div className="lines">
                <div className="line c1"></div>
                <div className="line c2"></div>
                <div className="line c3"></div>
                <div className="line c4"></div>
              </div>
            </div>
            <div className="selects">
              <div
                className={filter === "podcast" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("podcast");
                }}
              >
                <Mic fontSize="medium" className="mat-icon a1" />
                <p>{podcasts}</p>
              </div>
              <div
                className={filter === "article" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("article");
                }}
              >
                <Description fontSize="medium" className="mat-icon a2" />
                <p>{articles}</p>
              </div>
              <div
                className={filter === "link" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("link");
                }}
              >
                <Link fontSize="medium" className="mat-icon a3" />
                <p>{links}</p>
              </div>
              <div
                className={filter === "video" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("video");
                }}
              >
                <Movie fontSize="medium" className="mat-icon a4" />
                <p>{videos}</p>
              </div>
            </div>
            {isWhitelist ? (
              <div
                className="addbtn center"
                onClick={() => {
                  dispatch({
                    type: "OPEN_FORM",
                    form: "create_snippet",
                    id: collection.id,
                  });
                }}
              >
                <PlaylistAdd />
              </div>
            ) : (
              <div className="addbtn center">
                <NotInterested />
              </div>
            )}
          </div>
          <section>
            <div className="snippets">
              {snippets.map((snippet) => (
                <div key={snippet.id}>
                  {snippet.type_of.includes(filter) &&
                    snippet.title.includes(searchText) && (
                      <SnippetRow snippet={snippet} key={snippet.id} />
                    )}
                </div>
              ))}
            </div>
            <div className="highlight">
              <div className="container"></div>
            </div>
          </section>
        </main>
      ) : (
        <main className="collection-mobile">
          <header>
            <div className="card" style={coll_bg}></div>
            <div className="selects">
              <div
                className={filter === "podcast" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("podcast");
                }}
              >
                <Mic fontSize="medium" className="mat-icon" />
                <p>{podcasts}</p>
              </div>
              <div
                className={filter === "article" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("article");
                }}
              >
                <Description fontSize="medium" className="mat-icon" />
                <p>{articles}</p>
              </div>
              <div
                className={filter === "" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("");
                }}
              >
                <Link fontSize="medium" className="mat-icon" />
                <p>12/</p>
              </div>
              <div
                className={filter === "" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("");
                }}
              >
                <Movie fontSize="medium" className="mat-icon" />
                <p>12/</p>
              </div>
            </div>
            <div className="info">
              <div className="type">COLLECTION</div>
              <div className="name">{collection.name}</div>
              <div className="owner">by {collection.owner}</div>
              <div className="desc">{collection.desc}</div>
              <div className="tags">
                <div className="hash">
                  <Loyalty fontSize="small" />
                </div>
                {tags.map((tag) => (
                  <div
                    className="tag"
                    key={tags.id}
                    onClick={() => {
                      history.push(`/tag/${tag.name}`);
                    }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <div>
                <div className="btn center" onClick={followCollection}>
                  {isFollowed ? <p>UNFOLLOW</p> : <p>FOLLOW</p>}
                  <Favorite className={isFollowed ? "followed" : ""} />
                </div>
                <div className="btns">
                  {collection.owner === user && (
                    <div
                      className="ctrl-btn "
                      onClick={() => {
                        dispatch({
                          type: "OPEN_FORM",
                          form: "edit_permissions",
                          id: collection.id,
                          prefill_data: {
                            allowed_users: collection.allowed_users,
                            permission: collection.permission,
                          },
                        });
                      }}
                    >
                      <Security />
                    </div>
                  )}
                  {collection.owner === user && (
                    <div
                      className="ctrl-btn"
                      onClick={() => {
                        dispatch({
                          type: "OPEN_FORM",
                          form: "edit_collection",
                          id: collection.id,
                          prefill_data: {
                            form_data: {
                              name: collection.name,
                              desc: collection.desc,
                            },
                            visibility: collection.visibility,
                          },
                        });
                      }}
                    >
                      <Create />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          <div className="mid">
            <div className="searchsection">
              <div className="searchbox">
                <Search />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </div>
            </div>
            {isWhitelist ? (
              <div
                className="addbtn center"
                onClick={() => {
                  dispatch({
                    type: "OPEN_FORM",
                    form: "create_snippet",
                    id: collection.id,
                  });
                }}
              >
                <PlaylistAdd />
              </div>
            ) : (
              <div className="addbtn center">
                <NotInterested />
              </div>
            )}
          </div>
          <section>
            <div className="snippets">
              {snippets.map((snippet) => (
                <div key={snippet.id}>
                  {snippet.type_of.includes(filter) &&
                    snippet.title.includes(searchText) && (
                      <SnippetRow snippet={snippet} key={snippet.id} />
                    )}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default Collection;
