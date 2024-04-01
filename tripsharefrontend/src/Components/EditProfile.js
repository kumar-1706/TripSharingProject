import React, { useState, useEffect } from "react";
import styles from "../Styles/editProfile.module.css";
import { toast } from "react-toastify";

const EditProfile = () => {
  // State variables to store user details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to fetch user details from the database
  const fetchUserDetails = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:8080/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await response.json();
      setEmail(userData.email);
      setPassword(userData.password);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to update user details in the database
  const updateUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/user/update/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      toast.success("User Profile Details Updated", {
        autoClose: 2000,
        theme: "colored",
        closeButton: true,
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Error updating user profile details", {
        autoClose: 2000,
        theme: "colored",
        closeButton: true,
      });
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserDetails();
  };

  // Effect to fetch user details when component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor="Password">Password</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.passwordInput}
                />
                <button
                  type="button"
                  className={styles.showPasswordButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
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

export default EditProfile;
