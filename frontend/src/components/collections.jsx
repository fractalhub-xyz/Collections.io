import React, { useState, useEffect } from "react";
//CSS
import styles from "./collections.module.css";
//components
import { getCollections, getSnippets } from "../helpers/api";
import { postNewCollection } from "../helpers/api";
import Snippets from "./snippets";
//modules
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(true);
  const [error, setError] = useState("");
  const [errorSnippets, setErrorSnippets] = useState("");
  //toggles
  const [createCollectionDiv, setCreateCollectionDiv] = useState(false);
  const [createSnippetDiv, setCreateSnippetDiv] = useState(false);
  const [collectionDetailDiv, setCollectionDetailDiv] = useState(false);
  const hideCreateCollectionDiv = !createCollectionDiv && styles.hide;
  const hideCreateSnippetDiv = !createSnippetDiv && styles.hide;
  const hideCollectionDetail = !collectionDetailDiv && styles.hide;
  //selection Collection
  const [collectionName, setCollectionName] = useState("");
  const [collectionOwner, setCollectionOwner] = useState("");
  const [snippets, setSnippets] = useState([]);
  //createCollection
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  //createSnippet
  // title, typeof, link collection

  useEffect(() => {
    async function fetchCollection() {
      console.log("fetching collection data");
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection();
  }, []);

  useEffect(() => {
    async function fetchSnippets() {
      console.log("fetching snippets data");
      try {
        const response = await getSnippets();
        setAllSnippets(response.data);
      } catch (error) {
        console.error(error);
        setErrorSnippets("Error happened");
      }
      setIsLoadingSnippets(false);
    }

    fetchSnippets();
  }, []);

  const createCollection = async (e) => {
    e.preventDefault();
    const payload = { name, desc };
    try {
      const { data } = await postNewCollection(payload);
      const newCollections = [data, ...collections];
      setCollections(newCollections);
      setCreateCollectionDiv(false);
    } catch {
      console.log("Failed to create a new collection");
      // add error message
      alert("Failed");
    }
  };

  const openCollection = (name, owner, snippets) => {
    setCreateCollectionDiv(false);
    setCollectionDetailDiv(true);
    setCollectionName(name);
    setCollectionOwner(owner);
    setSnippets(snippets);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    slidesToScroll: 1,
    variableWidth: true,
    className: "customSlider",
  };

  return (
    <div className={styles.main}>
      <div className="cellHeader">
        List of Collection
        <span
          className={styles.btn}
          onClick={() => {
            setCreateCollectionDiv(!createCollectionDiv);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className={styles.addCollectionIcon} />
        </span>
      </div>

      {/* ALL COLLECTIONS SLIDER */}
      <div className={styles.sliderContainer}>
        {error && <div className={styles.info}>{error}</div>}
        {isLoading && <div className={styles.loader}>Loader</div>}
        <div className={styles.slickContainer}>
          <Slider {...settings}>
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={`${styles.card} ${styles.slickCustom}`}
                onClick={() => {
                  openCollection(
                    collection.name,
                    collection.owner,
                    collection.snippets
                  );
                }}
              >
                <div className={styles.name}>
                  {collection.name}
                  <br />
                  <span className={styles.owner}>
                    by&nbsp;{collection.owner}
                  </span>
                </div>
                <div className={styles.desc}>{collection.desc}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* NEW COLLECTION CELL  */}
      <div className={`${styles.newCollectionDiv} ${hideCreateCollectionDiv}`}>
        <div className={styles.center}>
          <div className={styles.sides} />
          <div className={`${styles.focus} ${styles.center}`}>
            <h4>Create New collection!</h4>
            <input
              className={styles.singleLineInput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Collection name"
            />
            <input
              className={styles.multiLineInput}
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="Collection description"
            />
            <button className={styles.submitbutton} onClick={createCollection}>
              Create
            </button>
          </div>
          <div className={styles.sides} />
        </div>
      </div>

      {/* COLLECTIONS DETAIL VIEW */}
      <div className={`${styles.collectionDetailView} ${hideCollectionDetail}`}>
        <h1>
          {collectionName} <span>by {collectionOwner}</span>
        </h1>
        <div className={styles.snippetsContainer}>
          {snippets.map((snippet) => (
            <Snippets key={snippet.id} snippet={snippet} />
          ))}
        </div>
        <button
          onClick={() => {
            setCollectionDetailDiv(false);
          }}
        >
          CLOSE
        </button>
      </div>

      {/* ALL SNIPPETS SLIDER */}
      <div className={styles.sliderContainer}>
        <div className={styles.slickContainer}>
          <div
            className={styles.btn}
            onClick={() => {
              setCreateSnippetDiv(!createSnippetDiv);
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.addCollectionIcon}
            />
          </div>
          {errorSnippets && <div className={styles.info}>{error}</div>}
          {isLoadingSnippets && <div className={styles.loader}>Loader</div>}
          <Slider {...settings}>
            {allSnippets.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                // onClick={() => {
                //   open(collection.name, collection.owner, collection.snippets);
                // }}
              >
                <div className={styles.name}>
                  {item.title}
                  <br />
                  <span className={styles.owner}>by&nbsp;{item.owner}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* NEW SNIPPET CELL*/}

      <div className={`${styles.newCollectionDiv} ${hideCreateSnippetDiv}`}>
        <h4>Create New SNIPPET!</h4>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}></div>
    </div>
  );
}

export default Collections;
