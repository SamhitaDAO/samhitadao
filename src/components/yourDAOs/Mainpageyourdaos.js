import React, { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import Joineddao from "./Joineddao";
import Createddao from "./Createddao";
import YourAssetsContent from "./YourAssetsContent";
import "../../styles/yourDAOS/mainpageyourdaos.css";

function Mainpageyourdaos() {
  const componentMap = {
    joinedDao: <Joineddao />,
    createdDao: <Createddao />,
    yourAssets: <YourAssetsContent />,
  };

  const [activeComponent, setActiveComponent] = useState("joinedDao");

  return (
    <div>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="main-div-for-your-dao-nav-bar">
            <div className="main-heading-of-the-your-daos">
              <div className="title-of-the-your-dao-page-i">
                Your Language DAOs
              </div>
              <div className="title-of-the-your-dao-page-ii">
                Click on any datadao to open dashboard for that dao.
              </div>
            </div>
            <div className="div-for-your-dao-nav-bar">
              <div className="div-to-give-white-bg-to-nav-bar-of-your-dao">
                <button
                  className="button-of-your-daos"
                  onClick={() => setActiveComponent("joinedDao")}
                >
                  Joined DAO
                </button>
                <button
                  className="button-of-your-daos"
                  onClick={() => setActiveComponent("createdDao")}
                >
                  Created DAO
                </button>
                <button
                  className="button-of-your-daos"
                  onClick={() => setActiveComponent("yourAssets")}
                >
                  Your Assets
                </button>
              </div>
            </div>
            <div className="component-container-to-showcase-the-your-daos">
              {activeComponent && componentMap[activeComponent]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpageyourdaos;
