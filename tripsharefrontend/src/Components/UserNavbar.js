import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo from "../assets/logo-png.png";
import "../Styles/userNavbar.css";
import { toast } from "react-toastify";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast.success("Logout successfully!", {
      autoClose: 2000,
      closeOnClick: true,
      theme: "colored",
    });
    navigate("/");
  };
  return (
    <div>
      <div className="usernavbarBody">
        <Navbar className="Navbar">
          <Container>
            <Link to="/home">
              <Navbar.Brand>
                <img
                  src={logo}
                  height="40"
                  className="d-inline-block align-top"
                  alt="TripShare Logo"
                />
              </Navbar.Brand>
            </Link>
            <Nav className="mx-auto">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Nav.Link href="#home" className="nav-link">
                  Home
                </Nav.Link>
              </Link>
              <Nav.Link
                href="#tripmanagement"
                as={Link}
                to="/trip-management"
                className="nav-link"
              >
                Trip Management
              </Nav.Link>
              <Link to="/expense-tracking" style={{ textDecoration: "none" }}>
                <Nav.Link
                  href="#automate"
                  className="nav-link"
                  to="/expense-tracking"
                >
                  AutoMate Expenses
                </Nav.Link>
              </Link>
            </Nav>
            <Link to="/profile">
              <Button className="profilebtn">Profile</Button>
            </Link>
            <Button className="btn-primary" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default UserNavbar;
