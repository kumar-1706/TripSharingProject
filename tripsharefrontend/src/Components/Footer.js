import React from "react";
import "../Styles/footer.css";
import logo from "../assets/logo-png.png";

const Footer = () => {
  return (
    <div className="footerbody">
      <footer>
        <div className="container">
          <div className="sec aboutus">
            <h2>About Us</h2>
            <img
              src={logo}
              style={{
                width: "80px",
                height: "50px",
              }}
              alt="logo"
            ></img>
            <p style={{ textAlign: "justify" }}>
              Welcome to Trip Sharing, where seamless trip sharing meets
              convenience. Our mission is to empower travelers with a
              comprehensive and user-friendly platform that simplifies the
              complexities of organizing and tracking expenses during journeys.
            </p>
            <ul className="sci">
              <li>
                <a href="#">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="sec quicklinks">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Trip Management</a>
              </li>
              <li>
                <a href="#">Automate Expenses</a>
              </li>
            </ul>
          </div>

          <div className="sec contact">
            <h2>Contact Us</h2>
            <ul className="info">
              <li>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>
                  Tata Strive Skill Dvelopment Center, KPHB, Kukatpally,
                  Hyderabad, Telangana.
                </span>
              </li>

              <li>
                <span>
                  <i className="fa-solid fa-phone"></i>
                </span>
                <p>
                  <a href="tel:999999999">999999999</a>
                  <br />
                  <a href="tel:56545646464">9876543210</a>
                </p>
              </li>

              <li>
                <span>
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <p>
                  <a href="mailto:knowmore@gmail.com">
                    knowmore@tripsharing.com
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyrightText">
          <p>Copyright &copy; 2024 Trip Share. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
