import * as React from "react";
import styles from "./Home.module.scss";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.hcontainer}>
          <p
            style={{
              padding: "0 5px",
              backgroundColor: "blue",
              width: "fit-content",
              borderRadius: "8px",
            }}
          >
            100% Satisfaction Guarantee
          </p>
          <h1>Start Your Learning Journey Today</h1>
          <div className={styles.tcontainer}>
            <div className={styles.leftbar} />
            <p className={styles.righttext}>
              Growth with our comprehensive online learning platform. Whether
              you're looking to advance your career, explore new interests.
            </p>
          </div>
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.container1}>
          <div className={styles.imagegrid}>
            <img
              style={{ marginRight: "3rem" }}
              src={require("../../../assets/Group16128.png")}
              alt="Laptop"
            />
          </div>
          <div className={styles.content}>
            <h2>Discover Our Online Learning Programs</h2>
            <p>
              Dive into an array of courses meticulously crafted to cater to
              your educational aspirations and professional growth.
            </p>
            <ul>
              <li>Seamless Scheduling</li>
              <li>Service Guarantee</li>
              <li>Integrated Collaboration</li>
            </ul>
            <button>Discover More</button>
          </div>
        </div>
      </section>

      <section className={styles.blog}>
        <h2>Our Latest News & Blog</h2>
        <div className={styles.container}>
          <div className={styles.bloggrid}>
            <article>
              <img src={require("../../../assets/01.png")} alt="" />
              <h3>Top 10 Skills to Thrive in the Digital Age</h3>
              <p>By John - August 25, 2023</p>
            </article>
            <article>
              <img src={require("../../../assets/02.png")} alt="" />
              <h3>Navigating the Future of Remote Learning</h3>
              <p>By Natasha - June 12, 2023</p>
            </article>
            <article>
              <img src={require("../../../assets/03.png")} alt="" />
              <h3>What Leonardo Teaches About Web Design</h3>
              <p>By William - July 28, 2023</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.courses}>
        <div className={styles.container}>
          <div>
            <h2>Find Your Path with Our Online Courses</h2>
            <p>
              Embark on a personalized journey of growth and discovery with our
              curated courses.
            </p>
            <ul>
              <li>Personalized Learning Paths</li>
              <li>Interactive Course Materials</li>
              <li>Expert Instructor Support</li>
            </ul>
            <button>Discover More</button>
          </div>
          <div>
            <img
              style={{ height: "21rem", paddingLeft: "2rem" }}
              src={require("../../../assets/Group16129.png")}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
