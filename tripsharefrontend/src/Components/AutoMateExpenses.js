import React, { useState, useEffect } from "react";
import styles from "../Styles/autoMateExpenses.module.css";
import vinatageMap from "../assets/vintagemap.jpg";
import { toast } from "react-toastify";

const AutoMateExpenses = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [numParticipants, setNumParticipants] = useState("");

  useEffect(() => {
    // Fetch trips by user ID
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/trip-history/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTrips(data);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Trips & selectedTrip", trips, selectedTrip);
    function isTripSelected(selectedTrip, trips) {
      // Check if selectedTrip matches any id in the trips array
      console.log("inside function", selectedTrip, trips);
      for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === parseInt(selectedTrip)) {
          return trips[i]; // selectedTrip matches a trip id
        }
      }
      return false; // selectedTrip does not match any trip id
    }

    const selectedTripData = isTripSelected(selectedTrip, trips);
    console.log(
      "Selected Data ",
      selectedTripData.startingPlace,
      selectedTripData.endingPlace,
      selectedTripData.startDate,
      selectedTripData.endDate
    );

    const userIdLocal = localStorage.getItem("userId");

    // Construct expense object
    const expenseData = {
      userId: userIdLocal,
      tripDetails: `${selectedTripData.startingPlace} to ${selectedTripData.endingPlace}, ${selectedTripData.startDate} to ${selectedTripData.endDate}`,
      expenseCategory: selectedCategory,
      amount: parseFloat(amount),
      numberOfParticipants: parseInt(numParticipants),
    };
    console.log(expenseData);
    // Send expense data to the backend
    fetch("http://localhost:8080/automate-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add expense");
        }
        // Clear form fields on successful submission
        setSelectedTrip("");
        setSelectedCategory("");
        setAmount("");
        setNumParticipants("");
        toast.success("Expense added successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
        toast.success("Error adding expense:", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <div className={styles.imgcontainer}>
        <img src={vinatageMap} alt="Vintage Map" />
      </div>
      <h1>Expense Tracking</h1>

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="tripList">Trip List</label>
              <br />
              <select
                id="tripList"
                onChange={(e) => setSelectedTrip(e.target.value)}
                value={selectedTrip}
                required
                style={{ width: "100%", height: "40px" }}
              >
                <option value="">Select Trip</option>
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.startDate} to {trip.endDate} - StartingPlace:{" "}
                    {trip.startingPlace} , EndingPlace: {trip.endingPlace}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="category">Expense Category</label>
              <br />
              <select
                id="category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                style={{ width: "100%", height: "40px" }}
                required
              >
                <option value="">Select category</option>
                <option value="food">Food</option>
                <option value="accommodation">Accommodation</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="numberParticipants">No Of Participants</label>
              <input
                type="number"
                placeholder="Enter Participants number"
                value={numParticipants}
                onChange={(e) => setNumParticipants(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.trackbtn}>
            <button type="submit">Track</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutoMateExpenses;
