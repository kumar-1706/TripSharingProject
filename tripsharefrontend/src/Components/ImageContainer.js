import React from "react";
import { Carousel, Button, FormControl, Form } from "react-bootstrap";
import mountainImage from "../assets/mountain.jpg";
import riverImage from "../assets/river.jpg";
import sunlightImage from "../assets/sunlight.jpg";
import rivermoutainImage from "../assets/rivermoutain.jpg";
import styles from "../Styles/imageContainer.module.css";

const ImageContainer = () => {
  const welcomeMsg = "Welcome to Trip Share ";

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <div>
            <img
              className={`d-block w-100 ${styles.imgContainerStyle}`}
              src={riverImage}
              alt="river"
            />
            <div className={styles.textContainerStyle}>{welcomeMsg}</div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <img
              className={`d-block w-100 ${styles.imgContainerStyle}`}
              src={mountainImage}
              alt="mountain"
            />
            <div className={styles.textContainerStyle}>{welcomeMsg}</div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <img
              className={`d-block w-100 ${styles.imgContainerStyle}`}
              src={sunlightImage}
              alt="sunlight"
            />
            <div className={styles.textContainerStyle}>{welcomeMsg}</div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <img
              className={`d-block w-100 ${styles.imgContainerStyle}`}
              src={rivermoutainImage}
              alt="rivermountain"
            />
            <div className={styles.textContainerStyle}>{welcomeMsg}</div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Form
        inline
        style={{ marginTop: "80px", marginLeft: "120px", display: "flex" }}
      >
        <FormControl
          type="search"
          placeholder="  Search Destination"
          className={`mr-sm-2 ${styles.searchBarStyle}`}
        />
        <Button className={styles.searchBtnStyle}>Search</Button>
      </Form>
    </div>
  );
};

export default ImageContainer;
