import React, { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/apihub/apihubmainpage.css";
import Apilists from "./Apilists";
import Apitesting from "./Apitesting";
import Scriptresponse from "./Scriptresponse";
import Apikeypopup from "./ApiKeyPopup";

function Apihubmainpage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState(null); // Store the selected API
  const [testMessage, setTestMessage] = useState(""); // State to hold the test message
  const [codeSnippet, setcodeSnippet] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleApiSelection = (api) => {
    setSelectedApi(api);
  };

  const handleTestMessage = (message, codeSnippet) => {
    setTestMessage(message);
    setcodeSnippet(codeSnippet);
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
        </div>
        <div className="api-hub-main-outer-div-of-the-page">
          <div className="api-hub-main-heading-div">
            <div className="apihub-main-page-heading-div">
              <div className="api-hub-heading-title-i">ScriptCraft</div>
              <div className="api-hub-heading-title-ii">
                Crafted APIs for Every Language
              </div>
            </div>
          </div>
          <div className="api-rental-contain-sub-3-div">
            <div className="three-div-of-api-hub">
              {/* Include the Apilists component and pass the handleApiSelection function */}
              <Apilists onSelectApi={handleApiSelection} />
            </div>
            <div className="three-div-of-api-hub">
              {/* Include the Apitesting component, pass the selectedApi and the function to update the message */}
              <Apitesting
                selectedApi={selectedApi}
                onTestMessage={handleTestMessage}
                codeSnippet={codeSnippet}
              />
            </div>
            <div className="three-div-of-api-hub">
              {/* Include the Scriptresponse component and pass the test message and code snippet */}
              <Scriptresponse
                testMessage={testMessage}
                codeSnippet={codeSnippet}
              />
            </div>
          </div>
          <div className="generate-api-key-div">
            <div className="api-key-button">
              <button
                className="button-to-generate-api-key"
                onClick={openPopup}
              >
                Generate API Key
              </button>
            </div>
          </div>
          {isPopupOpen && <Apikeypopup onClose={closePopup} />}
        </div>
      </div>
    </div>
  );
}

export default Apihubmainpage;
