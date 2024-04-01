import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  personCircleOutline,
  createOutline,
  listCircleOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import EditProfile from "../Components/EditProfile";
import EditPersonalDetails from "../Components/EditPersonalDetails";
import TripHistory from "../Components/TripHistory";
import styles from "../Styles/sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("personal");

  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "goBack") {
      navigate(-1);
    } else {
      setActiveMenuItem(menuItem);
    }
  };

  const renderActiveComponent = () => {
    switch (activeMenuItem) {
      case "editProfile":
        return <EditProfile />;
      case "tripHistory":
        return <TripHistory />;
      case "personal":
        return <EditPersonalDetails />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.navigation}>
        <ul>
          <li
            className={`${styles.list} ${
              activeMenuItem === "personal" ? styles.active : ""
            }`}
            onClick={() => handleMenuItemClick("personal")}
          >
            <b></b>
            <b></b>
            <a href="#">
              <span className={styles.icon}>
                <IonIcon icon={personCircleOutline} />
              </span>
              <span className={styles.title}>Personal</span>
            </a>
          </li>
          <li
            className={`${styles.list} ${
              activeMenuItem === "editProfile" ? styles.active : ""
            }`}
            onClick={() => handleMenuItemClick("editProfile")}
          >
            <b></b>
            <b></b>
            <a href="#">
              <span className={styles.icon}>
                <IonIcon icon={createOutline} />
              </span>
              <span className={styles.title}>Edit Profile</span>
            </a>
          </li>
          <li
            className={`${styles.list} ${
              activeMenuItem === "tripHistory" ? styles.active : ""
            }`}
            onClick={() => handleMenuItemClick("tripHistory")}
          >
            <b></b>
            <b></b>
            <a href="#">
              <span className={styles.icon}>
                <IonIcon icon={listCircleOutline} />
              </span>
              <span className={styles.title}>Trip History</span>
            </a>
          </li>

          <li
            className={`${styles.list} ${
              activeMenuItem === "goBack" ? styles.active : ""
            }`}
            onClick={() => handleMenuItemClick("goBack")}
          >
            <b></b>
            <b></b>
            <a href="#">
              <span className={styles.icon}>
                <IonIcon icon={arrowBackOutline} />
              </span>
              <span className={styles.title}>Go Back</span>
            </a>
          </li>
        </ul>
      </div>

      <div style={{ flexGrow: 1 }}>{renderActiveComponent()}</div>
    </div>
  );
};

export default Sidebar;
