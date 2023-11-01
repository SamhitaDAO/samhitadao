// Mainpageofdashboard.js

import React, { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/dashboard/mainpageofdashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileAlt,
  faTable,
  faList,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import Dashboardcomp from "../Dashboard/Dashboardcomp";
import Templatecomp from "../Dashboard/Templatecomp";
import Daodetailcomp from "../Dashboard/Daodetailcomp";
import { useEffect } from "react";
import Proposalcomp from "../Dashboard/Proposalcomp";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

function Mainpageofdashboard() {
  const { id } = useParams(); // Access the DAO ID from route parameters
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [daoData, setDaoData] = useState(null);

  const renderComponent = () => {
    switch (selectedOption) {
      case "dashboard":
        return <Dashboardcomp id={id} />; // Pass the ID to the Dashboardcomp component
      case "templates":
        return <Templatecomp />;
      case "daodetails":
        return <Daodetailcomp />;
      case "proposals":
        return <Proposalcomp />;
      default:
        return null;
    }
  };

  return (
    <div className="maindaoBg">
      <div className="your-dao-bg-images">
        <img
          src={topCurvedLinesDAO}
          className="topCurvedLinesDao"
          alt="Top Curve"
        />
        <div className="main-div-to-include-all-components">
          <div className="div-to-flex-sidebar-and-its-component">
            <div className="side-bar-for-dashboard">
              <div className="options-of-the-dashboard">
                <ul>
                  <li onClick={() => setSelectedOption("dashboard")}>
                    <FontAwesomeIcon icon={faChartBar} /> &nbsp; Dashboard
                  </li>
                  <li onClick={() => setSelectedOption("proposals")}>
                    <FontAwesomeIcon icon={faFileAlt} />
                    &nbsp; Proposals
                  </li>
                  <li onClick={() => setSelectedOption("daodetails")}>
                    <FontAwesomeIcon icon={faTable} />
                    &nbsp; DAO Details
                  </li>
                  <li onClick={() => setSelectedOption("templates")}>
                    <FontAwesomeIcon icon={faList} />
                    &nbsp; Templates
                  </li>
                </ul>
              </div>
            </div>
            <div className="component-to-render-in-this-render">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpageofdashboard;
