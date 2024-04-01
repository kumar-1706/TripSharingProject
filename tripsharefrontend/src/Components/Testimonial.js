import React from "react";
import styles from "../Styles/testimonial.module.css";

const TestimonialComponent = () => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.inner}>
        <h1 style={{ textAlign: "center", marginLeft: "10px" }}>
          Testimonials
        </h1>
        <div className={styles.border}></div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialflex}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1675034393381-7e246fc40755?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className={styles.testimonialsname}>
                  <div className={styles.name}>Emily Johnson</div>
                  <div className={styles.stars}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "justify" }}>
                <b>Effortless Travel Planning!</b>
                <br />
                TripSharing simplified my trip planning process. With its
                user-friendly interface and wide range of options, I found the
                perfect destinations and travel buddies in no time!
              </p>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialflex}>
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className={styles.testimonialsname}>
                  <div className={styles.name}>Liam Smith</div>
                  <div className={styles.stars}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "justify" }}>
                <b>Smooth Travel Experience!</b>
                <br />
                With TripSharing, I could customize my travel experiences like
                never before. Whether it's a solo adventure or group expedition,
                this platform caters to all preferences.
              </p>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialflex}>
                <img
                  src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
                  alt=""
                />
                <div className={styles.testimonialsname}>
                  <div className={styles.name}> Ethan Brown</div>
                  <div className={styles.stars}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "justify" }}>
                <b>Adventure Awaits with TripSharing!</b>
                <br />
                TripSharing opened doors to endless adventures. From hidden gems
                to popular destinations, I explored them all with ease. It's the
                ultimate tool for any travel enthusiast!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;
