import React, { useState, useEffect } from "react";
//CSS
import styles from "../collections.module.css";
//components
import { getCollections } from "../../helpers/api";
import Slider from "react-slick";
import NewCollection from "./new-collection";
import CollectionDetail from "./collection-detail";

//modules
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //toggles
  const [createCollectionDiv, setCreateCollectionDiv] = useState(false);
  const hideCreateCollectionDiv = !createCollectionDiv && styles.hide;
  //selection Collection
  const [collectionDetailDiv, setCollectionDetailDiv] = useState(false);
  const hideCollectionDetail = !collectionDetailDiv && styles.hide;
  const [currentCollectionID, setCurrentCollectionID] = useState(null);

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

  const openCollection = (id) => {
    setCollectionDetailDiv(true);
    setCurrentCollectionID(id);
  };

  const closeCollection = (id) => {
    setCollectionDetailDiv(false);
    setCurrentCollectionID(null);
  };

  const addCollection = (coll) => {
    const newColls = [coll, ...collections];
    setCollections(newColls);
    setCreateCollectionDiv(false);
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
            {collections.map((collection, idx) => (
              <div
                key={collection.id}
                className={`${styles.card} ${styles.slickCustom}`}
                onClick={() => {
                  openCollection(idx);
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
        {createCollectionDiv && (
          <NewCollection addCollectionToExisting={addCollection} />
        )}
      </div>

      {/* COLLECTIONS DETAIL VIEW */}
      <div className={`${styles.collectionDetailView} ${hideCollectionDetail}`}>
        {collectionDetailDiv && (
          <CollectionDetail
            collection={collections[currentCollectionID]}
            closeCollectionDetail={closeCollection}
          />
        )}
      </div>
    </div>
  );
}

export default Collections;
