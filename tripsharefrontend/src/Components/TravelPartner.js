import React, { useEffect } from "react";
import { useState } from "react";
import "../Styles/travelPartner.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const TravelPartner = () => {
  const userId = localStorage.getItem("userId");
  const API_URL = `http://localhost:8080/travelpartners/${userId}`;

  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((data) => data.json())
      .then((result) => setTravellers(result));
  }, [API_URL]);

  const handleChatNow = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const cards = travellers.map((traveller) => {
    const id = traveller.userId;
    console.log("id is ", id);
    const image = `http://localhost:8080/user/getProfileImage/${id}`;
    const [place, date] = traveller.travellingPlan
      .split(",")
      .map((str) => str.trim());
    return (
      <div className="col-md cardContainer" key={traveller.id}>
        <Card className="cardBody">
          <Card.Img className="cardImg" variant="top" src={image} />
          <Card.Body>
            <div className="cardName">
              <Card.Title className="">{traveller.name}</Card.Title>
            </div>
            <div className="cardDetails">
              <div className="cardAbout">
                <Card.Text className="text">
                  <h6>About Traveller:</h6>
                  <p>{traveller.email}</p>
                </Card.Text>
              </div>
              <div className="cardPlan">
                <Card.Text className="text">
                  <h6>Travelling Plan:</h6>
                  <p>
                    <strong>Place: </strong>
                    {place} <br /> <strong> Date: </strong> {date}
                  </p>
                </Card.Text>
              </div>
            </div>
            <div className="cardBtn">
              <Button onClick={() => handleChatNow(traveller.email)}>
                Chat Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return (
    <div className="row">
      <h2 style={{ textAlign: "left", marginLeft: "70px" }}>Invite Friends</h2>
      {cards}
    </div>
  );
};

export default TravelPartner;
