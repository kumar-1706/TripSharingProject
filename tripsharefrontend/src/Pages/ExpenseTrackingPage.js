import React from "react";
import AutoMateExpenses from "../Components/AutoMateExpenses";
import Footer from "../Components/Footer";
import UserNavbar from "../Components/UserNavbar";

const ExpenseTrackingPage = () => {
  return (
    <div>
      <UserNavbar />
      <AutoMateExpenses />
      <Footer />
    </div>
  );
};

export default ExpenseTrackingPage;
