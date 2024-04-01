import React from "react";
import NavBarTop from "../Components/NavBarTop";
import ImageContainer from "../Components/ImageContainer";
import Testimonial from "../Components/Testimonial";
import SeasonCard from "../Components/SeasonCard";
import Footer from "../Components/Footer";

const LandingPage = () => {
  return (
    <div>
      <NavBarTop />
      <ImageContainer />
      <Testimonial />
      <SeasonCard />
      <Footer />
    </div>
  );
};

export default LandingPage;
