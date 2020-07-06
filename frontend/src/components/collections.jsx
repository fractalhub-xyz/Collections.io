import React, { useState, useEffect, useContext } from "react";
import { getCollections } from "../helpers/api";
import Navbar from "./navbar";
import CollectionItem from "./collection-item";
import styles from "./collections.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  //temp
  const [loggedIn, setLoggedIn] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    async function fetchCollection() {
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection();
  }, []);

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <div>
          <div className={styles.title}>
            Collections
            <span>
              {loggedIn ? (
                <a href="/newcollection">
                  <FontAwesomeIcon
                    className={`${styles.addCollection} ${styles.loggedIn}`}
                    icon={faPlusCircle}
                    style={{ color: "white" }}
                  />
                </a>
              ) : (
                <FontAwesomeIcon
                  className={`${styles.addCollection} ${styles.loggedOut}`}
                  icon={faPlusCircle}
                  style={{ color: "white" }}
                />
              )}
            </span>
          </div>
          <Slider {...settings}>
            {collections.map((coll) => (
              <CollectionItem
                key={coll.name}
                name={coll.name}
                owner={coll.owner}
                desc={coll.desc}
                snippets={coll.snippets}
              />
            ))}
          </Slider>
        </div>

        {/* <div className={styles.title}>Collections</div>
        <div className={styles.container}>
          {isLoading && "Loading..."}
          {error ? error : null}
          {collections.map((coll) => (
            <CollectionItem
              key={coll.name}
              name={coll.name}
              owner={coll.owner}
              desc={coll.desc}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
