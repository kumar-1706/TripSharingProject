import React from "react";
import UserNavbar from "../Components/UserNavbar";
import TravelPartner from "../Components/TravelPartner";
import CreateTrip from "../Components/CreateTrip";
import Footer from "../Components/Footer";

const CreateTripPage = () => {
  return (
    <div>
      <UserNavbar />
      <CreateTrip />
      <TravelPartner />
      <Footer />
    </div>
  );
};

export default CreateTripPage;
