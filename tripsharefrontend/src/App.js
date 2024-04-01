import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./Pages/LandingPage";
import UserHomePage from "./Pages/UserHomePage";
import CreateTripPage from "./Pages/CreateTripPage";
import ProfilePage from "./Pages/ProfilePage";
import ExpenseTrackingPage from "./Pages/ExpenseTrackingPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/trip-management" element={<CreateTripPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/expense-tracking" element={<ExpenseTrackingPage />} />
        </Routes>
      </Router>

      <ToastContainer
        position={"bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={"colored"}
        transition={"Bounce"}
        bodyClassName={"toastBody"}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
