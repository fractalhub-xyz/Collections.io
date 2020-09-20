import React, { useState, useEffect } from "react";
import "./collection.sass";

//api
import { getCollectionFromID } from "../../helpers/api";
//components
import SnippetRow from "./snippetRow";
//icons
import Podcast from "../../assets/svgs/podcasts.svg";
import Article from "../../assets/svgs/articles_green.svg";
import URL from "../../assets/svgs/URLs.svg";
import Video from "../../assets/svgs/videos.svg";
import { Favorite, FavoriteOutlined, Search } from '@material-ui/icons';

// import { Heart } from "react-feather";
//modules
import { useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Collection() {
  //states
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [searchText, setSearchText] = useState("");

  //misc
  const [totFollowers, setTotFollowers] = useState(0);

  //flags
  const [isLiked, setIsLiked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };

  //global states
  const [{ user }, dispatch] = useStateValue();

  const params = useParams();

  // lifecycle functions
  useEffect(() => {
    dispatch({
      type: "SET_PAGE",
      page: "collection_detail",
    });
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
        console.error(error);
        setGetError(`Failed to load collection with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchCollection();
    setRefresh(false);
  }, [refresh, params]);

  useEffect(() => {
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
    if (collection.tags) {
      if (collection.tags[0]) {
        console.log("tag", collection.tags[0]);
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection, user]);

  const podcasts = snippets.filter((snip) => snip.type_of === "podcast").length;
  const articles = snippets.filter((snip) => snip.type_of === "article").length;

  return (
    <main className="collection">
      <header>
        <div className="detail">
          <div className="card" style={coll_bg}></div>
          <div className="info">
            <div className="name">{collection.name}</div>
            <div className="owner">
              by<strong>&nbsp;{collection.owner}</strong>
            </div>
            <br />
            <div className="desc">{collection.desc}</div>
            <div className="stats">
              <div className="stat">
                <img src={Podcast} alt="Podcast" className="icon" />
                <div></div>
                <div className="title">Podcasts</div>
                <div className="count center">{podcasts}</div>
              </div>
              <div className="stat">
                <img src={Article} alt="Article" className="icon" />
                <div></div>
                <div className="title">Articles</div>
                <div className="count center">{articles}</div>
              </div>
              <div className="stat">
                <img src={Video} alt="Video" className="icon" />
                <div></div>
                <div className="title">Videos</div>
                <div className="count center">56</div>
              </div>
              <div className="stat">
                <img src={URL} alt="Url" className="icon" />
                <div></div>
                <div className="title">Links </div>
                <div className="count center">56</div>
              </div>
            </div>
          </div>
          <div className="interact">
            <div className="likes">
              <Favorite className={isFollowed ? "icon red" : "icon"} />
              <div className="count">{totFollowers}</div>
            </div>
          </div>
        </div>

        <div className="control">
          <div className="snip-search">
            <div className="center search-icon">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value, searchText);
              }}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="podcast">Podcasts</option>
            <option value="article">Articles</option>
          </select>
        </div>
      </header>
      <section>
        {snippets.map((snippet) => (
          <div key={snippet.id}>
            {snippet.type_of.includes(filter) &&
              snippet.title.includes(searchText) && (
                <SnippetRow snippet={snippet} key={snippet.id} />
              )}
          </div>
        ))}
      </section>
      <button
        onClick={() => {
          dispatch({ type: "OPEN_FORM", form: "sdfsd" });
        }}
      >
        OPEN MODAL
      </button>
    </main>
  );
}

export default Collection;
