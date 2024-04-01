import React, { useState } from "react";
import styles from "../Styles/createTrip.module.css";
import greenarymountain from "../assets/greenarymountain.jpg";
import { toast } from "react-toastify";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    startingPlace: "",
    endingPlace: "",
    startDate: "",
    endDate: "",
    inBetweenStop: "",
    packingChecklist: "",
  });
  const API_URL = "http://localhost:8080/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`${API_URL}trips/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Trip created successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
        });

        setFormData({
          startingPlace: "",
          endingPlace: "",
          startDate: "",
          endDate: "",
          inBetweenStop: "",
          packingChecklist: "",
        });
      } else {
        toast.error("Failed to create trip", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
        });
        console.error("Failed to create trip:", response.statusText);
      }
    } catch (error) {
      toast.error("Error creating trip", {
        autoClose: 2000,
        closeOnClick: true,
        theme: "colored",
      });
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div>
      <div className={styles.imgcontainer}>
        <img src={greenarymountain} alt="MountaiImage" />
      </div>
      <div className={styles.container}>
        <h1>Create Trip</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="startplace">Starting Place</label>
              <input
                type="text"
                id="startingPlace"
                placeholder="Start Place of Trip"
                value={formData.startingPlace}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.column}>
              <label htmlFor="endplace">Ending Place</label>
              <input
                type="text"
                id="endingPlace"
                placeholder="End Place of Trip"
                value={formData.endingPlace}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date"
                id="startDate"
                placeholder="Start Date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label htmlFor="enddate">End Date</label>
              <input
                type="date"
                id="endDate"
                placeholder="End Date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="betweenstops">Between Stops</label>
              <input
                type="text"
                id="inBetweenStop"
                placeholder="Add Between Stops"
                value={formData.inBetweenStop}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.column}>
              <label htmlFor="packingchecklist">Packing Checklist</label>
              <input
                type="text"
                id="packingChecklist"
                placeholder="Packing Check List"
                value={formData.packingChecklist}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.createbtn}>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
