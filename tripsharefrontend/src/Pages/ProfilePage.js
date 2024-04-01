import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import EditProfile from "../Components/EditProfile";
import TripHistory from "../Components/TripHistory";

const ProfilePage = () => {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/trip-history" element={<TripHistory />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;
