import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import Proposalcomp from "../Dashboard/Proposalcomp";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

function Mainpageofdashboard() {
  const location = useLocation();
  const { state } = location;
  console.log(location);
  console.log(state);
  const { id } = useParams(); // Access the DAO ID from route parameters
  const [isSamhita, setIsSamhita] = useState(false); // Default value is false
  const [daoAddress, setDaoAddress] = useState(null);

  // Check if state exists and access the props
  useEffect(() => {
    if (state) {
      const { isSamhita, daoAddress } = state;
      setIsSamhita(isSamhita);
      setDaoAddress(daoAddress);
    }
  }, [state]);

  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [daoData, setDaoData] = useState(null);

  const renderComponent = () => {
    switch (selectedOption) {
      case "dashboard":
        return (
          <Dashboardcomp
            id={id}
            isSamhita={isSamhita}
            daoAddress={daoAddress}
          />
        );
      case "templates":
        return (
          <Templatecomp id={id} isSamhita={isSamhita} daoAddress={daoAddress} />
        );
      case "daodetails":
        return (
          <Daodetailcomp
            id={id}
            isSamhita={isSamhita}
            daoAddress={daoAddress}
          />
        );
      case "proposals":
        return (
          <Proposalcomp id={id} isSamhita={isSamhita} daoAddress={daoAddress} />
        );
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
