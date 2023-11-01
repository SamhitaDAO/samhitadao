import React, { useState } from "react";
import "../../styles/apihub/scriptresponse.css";

function Scriptresponse({ testMessage, codeSnippet }) {
  const [activeTab, setActiveTab] = useState("script"); // Default active tab is "script"
  const [isCopied, setIsCopied] = useState("false");

  const handleCopyClick = () => {
    console.log("copy button is clicked");
    const copyText = codeSnippet || ""; // Use an empty string if codeSnippet is undefined

    if (copyText) {
      navigator.clipboard.writeText(copyText).then(
        () => {
          setIsCopied(true); // Update copy status
          setTimeout(() => setIsCopied(false), 2000); // Reset isCopied after 2 seconds
        },
        (err) => {
          console.error("Unable to copy: ", err);
        }
      );
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Content for the Script tab
  const scriptContent = (
    <div className="card-script-response">
      <div className="flex-to-combine-icon-and-heading-in-the-script">
        <h6>Script Content</h6>
        {/* <button onClick={handleCopyClick}> */}
        <button
          className={`fas fa-clipboard${isCopied ? " copied" : ""}`}
          title="Copy to Clipboard"
          onClick={handleCopyClick}
        ></button>
        {/* </button> */}
      </div>
      <div className="code-snippet-is-here-in-the-script-div">
        {testMessage && <p>{testMessage}</p>}
        {codeSnippet && (
          <div className="code-snippet">
            {/* <h6>Code Snippet</h6> */}
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );

  // Content for the Response tab
  const responseContent = (
    <div className="card-script-response">
      {/* <h6>Response Content</h6> */}
      {/* <p>This is the content for the Response tab.</p> */}
    </div>
  );

  return (
    <div className="api-card">
      <div className="api-card-header">
        <button
          className={activeTab === "script" ? "active" : ""}
          onClick={() => handleTabClick("script")}
        >
          Script
        </button>
        <button
          className={activeTab === "response" ? "active" : ""}
          onClick={() => handleTabClick("response")}
        >
          Response
        </button>
      </div>
      <div className="api-script-response-container">
        {activeTab === "script" ? scriptContent : responseContent}
      </div>
    </div>
  );
}

export default Scriptresponse;
