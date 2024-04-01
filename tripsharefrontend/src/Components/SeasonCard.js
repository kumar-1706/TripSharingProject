import React, { useState } from "react";
import mountainImage from "../assets/mountain.jpg";
import riverImage from "../assets/river.jpg";
import rivermoutainImage from "../assets/rivermoutain.jpg";
import grennmountain from "../assets/greenmountain.jpg";
import charminar from "../assets/charminar.jpg";
import bear from "../assets/bear.png";
import styles from "../Styles/seasoncard.module.css";
import { IonIcon } from "@ionic/react";
import { funnel } from "ionicons/icons";

const SeasonCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false); // Hide the dropdown after selecting an option
  };

  const filterOptions = ["All", "Summer", "Rainy", "Winter"];

  // Define card data based on the filter option
  const cardData = [
    { image: charminar, title: "Chariminar", season: "Summer" },
    { image: riverImage, title: "Lambasingi", season: "Rainy" },
    { image: rivermoutainImage, title: "Kodaikanal", season: "Summer" },
    { image: mountainImage, title: "Kashmir", season: "Winter" },
    { image: grennmountain, title: "Araku", season: "Winter" },
    { image: bear, title: "Kerla", season: "Rainy" },
  ];

  // Filter cards based on the selected filter
  const filteredCards =
    selectedFilter === "All"
      ? cardData
      : cardData.filter((card) => card.season === selectedFilter);

  return (
    <div className={styles.bodySeason}>
      <div className={styles.container}>
        <div className={styles.destinationHeader}>
          <h2>Explore Destinations</h2>
          <div className={styles.filterContainer}>
            <p onClick={toggleDropdown}>Filter</p>
            <span className={styles.icon}>
              <IonIcon icon={funnel} />
            </span>
            {showDropdown && (
              <div className={styles.dropdown}>
                <ul>
                  {filterOptions.map((option) => (
                    <li key={option} onClick={() => handleFilterChange(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {filteredCards.map((card, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.imgBx}>
                <img src={card.image} alt={card.title} />
              </div>
              <div className={styles.content}>
                <h2>{card.title}</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus voluptates illo, harum officia natus perspiciatis
                  cumque officiis exercitationem nihil quasi!
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
