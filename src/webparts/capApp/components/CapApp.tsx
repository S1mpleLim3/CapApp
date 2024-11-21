import * as React from "react";
import styles from "./CapApp.module.scss";
import type { ICapAppProps } from "./ICapAppProps";
import NavBar from "./NavBar/NavBar";
import Home from "./Pages/Home/Home";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Admin from "./Pages/Admin/Admin";
//import Group1png from "../assets/Group16128.png";

const CapApp: React.FunctionComponent<ICapAppProps> = (props) => {
  return (
    <>
      <NavBar />
      <div className={styles.capApp}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard sp={props.sp} />} />
            <Route path="/admin/" element={<Admin sp={props.sp} />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
};

export default CapApp;
