import React, { useState } from "react";
import { toast } from "react-toastify";
import { Navbar, Container, Nav, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-png.png";

const NavBarTop = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [emailExistsError, setEmailExistsError] = useState(false); // State variable to track email exists error
  const [formValid, setFormValid] = useState(false); // State variable to track form validity
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/";

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
    setEmailExistsError(false);
    setFormValid(false); // Reset form validity when closing modal
  };
  const handleShowSignupModal = () => setShowSignupModal(true);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json(); // Read response as JSON
        console.log("Response Data:", responseData); // Log the response data

        // Store user ID in localStorage
        localStorage.setItem("userId", responseData.userId);

        toast.success("Login successful", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
          onClose: () => handleCloseLoginModal(),
        });
        navigate("/home");
        // Check if the response data is JSON
        try {
          const data = JSON.parse(responseData);
          console.log("User Data:", data); // Log the parsed JSON data
        } catch (error) {
          // Handle JSON parsing error
          console.error("Error parsing JSON:", error);
        }
      } else {
        toast.error("Invalid email or password", {
          autoClose: 2000,
          theme: "colored",
          closeButton: true,
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      toast.error("An error occurred during login", {
        autoClose: 2000,
        closeButton: true,
        theme: "colored",
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(API_URL + "user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          gender,
          phoneNumber,
          dateOfBirth,
          nationality,
          address,
          pincode,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
          onClose: () => handleCloseLoginModal(),
        });
        setShowSignupModal(false);
      } else if (response.status === 409) {
        // HTTP status code 409 for conflict
        setEmailExistsError(true); // Set email exists error if the email already exists
        toast.info("Email already exists", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
          onClose: () => handleCloseLoginModal(),
        });
      } else {
        toast.error("Error during registration", {
          autoClose: 2000,
          closeButton: true,
          theme: "colored",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration", {
        autoClose: 2000,
        closeButton: true,
        theme: "colored",
      });
    }
  };

  const validateForm = () => {
    return (
      fullName &&
      email &&
      password &&
      gender &&
      phoneNumber &&
      dateOfBirth &&
      nationality &&
      address &&
      pincode
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "fullName") setFullName(value);
    else if (name === "gender") setGender(value);
    else if (name === "phoneNumber") setPhoneNumber(value);
    else if (name === "dateOfBirth") setDateOfBirth(value);
    else if (name === "nationality") setNationality(value);
    else if (name === "address") setAddress(value);
    else if (name === "pincode") setPincode(value);

    // Update form validity
    setFormValid(validateForm());
  };
  return (
    <Navbar className="Navbar">
      <Container>
        <a href="#home">
          <Navbar.Brand>
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="TripShare Logo"
            />
          </Navbar.Brand>
        </a>
        <Nav className="mx-auto">
          <Nav.Link href="#home" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link href="#tripmanagement" className="nav-link">
            Trip Management
          </Nav.Link>
          <Nav.Link href="#automate" className="nav-link">
            Automate Expenses
          </Nav.Link>
        </Nav>
        <Button className="signupbtn" onClick={handleShowSignupModal}>
          SignUp
        </Button>
        <Button className="btn-primary" onClick={handleShowLoginModal}>
          Login
        </Button>

        <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLoginModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSignupModal} onHide={handleCloseSignupModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="fullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={fullName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                {emailExistsError && (
                  <Form.Text className="text-danger">
                    Email already exists
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  required
                  name="gender"
                  value={gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date of birth"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nationality"
                  name="nationality"
                  value={nationality}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter address"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter pincode"
                  name="pincode"
                  value={pincode}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSignupModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSignUp}
              disabled={!formValid}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default NavBarTop;
