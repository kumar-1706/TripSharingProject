import React, { useEffect, useState } from "react";
import styles from "../Styles/tripHistory.module.css";

import { arrowForwardOutline, cloudDownloadOutline } from "ionicons/icons";

const TripHistory = () => {
  const [tripHistories, setTripHistories] = useState([]);

  useEffect(() => {
    // Fetch trip history data from the API
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/trip-history/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setTripHistories(data))
      .catch((error) =>
        console.error("Error fetching trip history data:", error)
      );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tripContainer}>
        <div className={styles.trip}>
          <div className={styles.label}>Date</div>
          <div className={styles.pipe}>|</div>
          <div className={styles.label}>From</div>
          <div className={styles.pipe}>|</div>
          <div className={`${styles.label} ${styles.to}`}>To</div>
          <div className={styles.pipe}>|</div>
          <div className={styles.label}>Download</div>
        </div>
      </div>

      {tripHistories.map((trip) => (
        <div className={styles.historyContainer} key={trip.id}>
          <div className={styles.tripContainer}>
            <div className={styles.trip}>
              <div className={styles.date}>
                <p>
                  {trip.startDate} to {trip.endDate}
                </p>
              </div>
              <div className={styles.historyBody}>
                <div className={styles.startingPlace}>
                  <p>{trip.startingPlace} </p>
                </div>
                <div className={styles.arrow}>
                  <p>
                    <ion-icon icon={arrowForwardOutline}></ion-icon>
                  </p>
                </div>
                <div className={styles.endingPlace}>
                  <p>{trip.endingPlace}</p>
                </div>
              </div>
              <div className={styles.download}>
                <ion-icon icon={cloudDownloadOutline}></ion-icon>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripHistory;
