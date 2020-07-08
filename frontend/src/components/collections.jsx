import React, { useState, useEffect } from "react";
//CSS
import styles from "./collections.module.css";
//components
import { getCollections, getSnippets } from "../helpers/api";
import Snippets from "./snippets";
//modules
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const openCollection = (name, owner, snippets) => {
    setCreateCollectionDiv(false);
    setCollectionDetailDiv(true);
    setCollectionName(name);
    setCollectionOwner(owner);
    setSnippets(snippets);
  };

  return (
    <div className={styles.main}>
      {/* ALL COLLECTIONS SLIDER */}
      <div className={styles.allCollections}>
        <div className={styles.sliderContainer}>
          <div
            className={styles.btn}
            onClick={() => {
              setCreateCollectionDiv(!createCollectionDiv);
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.addCollectionIcon}
            />
          </div>
          {error && <div className={styles.info}>{error}</div>}
          {isLoading && <div className={styles.loader}>Loader</div>}
          {collections.map((collection) => (
            <div
              key={collection.id}
              className={styles.card}
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
                <span className={styles.owner}>by&nbsp;{collection.owner}</span>
              </div>
              <div className={styles.desc}>{collection.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW COLLECTION CELL  */}
      <div className={`${styles.newCollectionDiv} ${hideCreateCollectionDiv}`}>
        <h4>Create New collection!</h4>
        <input
          className={styles.inputfield}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Collection name"
        />
        <input
          className={styles.inputfield}
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          placeholder="Collection description"
        />
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
      <div className={styles.allSnippets}>
        <div className={styles.sliderContainer}>
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
