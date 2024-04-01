import React, { useState, useEffect } from "react";
import styles from "../Styles/editPersonalDetails.module.css";
import { toast } from "react-toastify";

const EditPersonalDetails = () => {
  // State to store user details
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    pincode: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("pincode", formData.pincode);
      formDataToSend.append("image", formData.image); // Append the image file

      const response = await fetch(
        `http://localhost:8080/user/update/${userId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }
      toast.success("User Details Updated", {
        autoClose: 2000,
        theme: "colored",
        closeButton: true,
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Error updating user details", {
        autoClose: 2000,
        theme: "colored",
        closeButton: true,
      });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // Handle file input change separately
      setFormData({ ...formData, image: event.target.files[0] });
    } else {
      // Handle other input changes
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:8080/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await response.json();
      setFormData({
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        address: userData.address,
        pincode: userData.pincode,
        image: userData.profileImage ? userData.profileImage : null,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Person Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.circleContainer}>
                <div className={styles.circle}>
                  {formData.image ? (
                    <img
                      src={`http://localhost:8080/user/getProfileImage/${localStorage.getItem(
                        "userId"
                      )}`}
                      alt="Profile"
                    />
                  ) : (
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                  )}
                  <div className={styles.fileinput}>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className={styles.customFileInput}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.savebtn}>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPersonalDetails;
