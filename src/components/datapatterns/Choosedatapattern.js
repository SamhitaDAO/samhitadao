import React, { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/datapatternpages/choosedatapattern.css";
import datacraftimg from "../../assets/data-pattern/datacraft.png";
import datascrapeimg from "../../assets/data-pattern/datascrape.png";
import Datascrape from "./Datascrape";
import Datacraft from "./Datacraft";
import { useNavigate } from "react-router-dom";

function DataPatternCard({
  imageSrc,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="data-pattern-card">
      <img src={imageSrc} alt={title} className="data-pattern-card-image" />
      <h2 className="data-pattern-card-title">{title}</h2>
      <h5 className="data-pattern-card-description">{description}</h5>
      <button className="data-pattern-card-button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

function Choosedatapattern() {
  const [showDatascrape, setShowDatascrape] = useState(false);
  const [showDatacraft, setShowDatacraft] = useState(false);
  const navigate = useNavigate();

  const handleDatascrapeClick = () => {
    console.log("clicked");
    setShowDatascrape(true);
    setShowDatacraft(false);

    navigate("/go-to-choose-template/datascrape");
  };

  const handleDatacraftClick = () => {
    setShowDatacraft(true);
    setShowDatascrape(false);
    navigate("/go-to-choose-template/datacraft");
  };

  return (
    <div>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="main-div-for-choose-data-pattern">
            <div className="choose-data-pattern-title-bar">
              <div className="choose-data-pattern-title-bar-big-heading">
                <h1 className="choose-data-pattern-title-bar-big-heading-h1">
                  Choose your Data Pattern
                </h1>
              </div>
              <div className="choose-data-pattern-title-bar-small-heading">
                <h3 className="choose-data-pattern-title-bar-small-heading-h1">
                  Create your Language Database with Flexible Template for all
                  Data Sources
                </h3>
              </div>
            </div>
            <div className="choose-data-pattern-editor-div">
              <div className="card-container-data-pattern-div">
                <DataPatternCard
                  imageSrc={datacraftimg}
                  title="DataScrape"
                  description="Unveil, Visualize, Empower"
                  buttonText="Create"
                  onClick={handleDatascrapeClick}
                />
                <DataPatternCard
                  imageSrc={datascrapeimg}
                  title="DataCraft"
                  description="Create, Refine, Excel"
                  buttonText="Create"
                  onClick={handleDatacraftClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDatacraft && <Datacraft />}
      {showDatascrape && <Datascrape />}
    </div>
  );
}

export default Choosedatapattern;
