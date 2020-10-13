import React, { useState, useEffect } from "react";
import "./collection.sass";
import axios from "axios";
//api
import { getCollectionFromID, postFollowCollection } from "../../helpers/api";
//components
import SnippetRow from "./snippetRow";
import { isMobile } from "react-device-detect";
//icons
import {
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
  Star,
  Add,
  Report,
} from "@material-ui/icons";

//modules
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";
import { getCoverForCollection, setLen } from "../../helpers/utils";

function Collection() {
  //states
  const [collection, setCollection] = useState({});
  const [colid, setColid] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [quote, setQoute] = useState("");
  const [author, setAuthor] = useState("");

  let history = useHistory();
  //misc
  const [totFollowers, setTotFollowers] = useState(0);

  //flags
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

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
        if (error.response.status === 403) {
          setIsPrivate(true);
        }
        console.error(error.response.data);
      }
      setIsLoading(false);
      try {
        const response = await axios.get("https://quotes.rest/qod?language=en");
        setAuthor(response.data.contents.quotes[0].author);
        setQoute(response.data.contents.quotes[0].quote);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCollection();
    dispatch({
      type: "REFRESH",
      refresh: false,
    });
  }, [refresh, colid, params, dispatch]);

  useEffect(() => {
    if (user === collection.owner) {
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
  const total = podcasts + articles + links + videos;

  if (isPrivate) {
    return (
      <main className="error-page">
        <Report fontSize="large" />
        <div>You can't access this collection</div>
      </main>
    );
  }

  return (
    <div>
      {!isMobile ? (
        <main className="collection">
          <header>
            <div
              className="card"
              style={getCoverForCollection(collection)}
            ></div>
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
                <div
                  className="addtag"
                  onClick={() => {
                    dispatch({
                      type: "OPEN_FORM",
                      form: "edit_tags",
                      id: collection.id,
                      prefill_data: {
                        tags: collection.tags
                          .map((tag) => tag.name.trim())
                          .join(","),
                      },
                    });
                  }}
                >
                  <Add />
                </div>
              </div>
              <div className="btn center" onClick={followCollection}>
                {isFollowed ? <p>UNFOLLOW</p> : <p>FOLLOW</p>}
                <Star className={isFollowed ? "followed" : ""} />
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
                <div style={setLen(podcasts, total)} className="line c1"></div>
                <div style={setLen(articles, total)} className="line c2"></div>
                <div style={setLen(videos, total)} className="line c3"></div>
                <div style={setLen(links, total)} className="line c4"></div>
              </div>
            </div>
            <div className="selects">
              <div
                className={filter === "podcast" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("podcast");
                }}
              >
                <Mic fontSize="default" className="mat-icon a1" />
                <p>{podcasts}</p>
              </div>
              <div
                className={filter === "article" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("article");
                }}
              >
                <Description fontSize="default" className="mat-icon a2" />
                <p>{articles}</p>
              </div>
              <div
                className={filter === "link" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("link");
                }}
              >
                <Link fontSize="default" className="mat-icon a4" />
                <p>{links}</p>
              </div>
              <div
                className={filter === "video" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("video");
                }}
              >
                <Movie fontSize="default" className="mat-icon a3" />
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
              <div className="container">
                <div className="quote">"{quote}"</div>
                <div className="author">by {author}</div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="collection-mobile">
          <header>
            <div
              className="card"
              style={getCoverForCollection(collection)}
            ></div>
            <div className="selects">
              <div
                className={filter === "podcast" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("podcast");
                }}
              >
                <Mic fontSize="default" className="mat-icon a1" />
                <p>{podcasts}</p>
              </div>
              <div
                className={filter === "article" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("article");
                }}
              >
                <Description fontSize="default" className="mat-icon a2" />
                <p>{articles}</p>
              </div>
              <div
                className={filter === "link" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("link");
                }}
              >
                <Link fontSize="default" className="mat-icon a4" />
                <p>{links}</p>
              </div>
              <div
                className={filter === "video" ? "select current" : "select"}
                onClick={(e) => {
                  setFilter("video");
                }}
              >
                <Movie fontSize="default" className="mat-icon a3" />
                <p>{videos}</p>
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
                <div
                  className="addtag"
                  onClick={() => {
                    dispatch({
                      type: "OPEN_FORM",
                      form: "edit_tags",
                      id: collection.id,
                      prefill_data: {
                        tags: collection.tags,
                      },
                    });
                  }}
                >
                  <Add />
                </div>
              </div>
              <div>
                <div className="btn center" onClick={followCollection}>
                  {isFollowed ? <p>UNFOLLOW</p> : <p>FOLLOW</p>}
                  <Star className={isFollowed ? "followed" : ""} />
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
                    setSearchText(e.target.value.toLowerCase());
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
                    snippet.title.toLowerCase().includes(searchText) && (
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
