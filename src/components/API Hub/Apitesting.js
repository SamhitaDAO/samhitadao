import React, { useState } from "react";
// import axios from "axios";
import "../../styles/apihub/apitesting.css";

const codeSnippet = `$.post('https://api.trongrid.io/wallet/gettransactionbyid', {"value": "d5ec749ecc2a615399d8a6c864ea4c74ff9f523c2be0e341ac9be5d47d7c2d62"}, function(data) {
  console.log(data);
});`;

function Apitesting({ selectedApi, onTestMessage }) {
  // State variables for input field values
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [codeSnippet, setcodeSnippet] = useState("");

  // Function to handle the test button click event
  const handleTestButtonClick = async () => {
    console.log("Test button is clicked");
    const code = `const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.shasta.trongrid.io/wallet/getnodeinfo', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));`;

    // setcodeSnippet(code);
    onTestMessage(code);
  };

  return (
    <div className="api-card">
      <h1 className="api-card-header">Testing</h1>
      <div className="api-testing-container">
        <div className="card-testing">
          {selectedApi ? (
            <>
              <h6>
                <b>Title:</b> &nbsp;{selectedApi.title}
              </h6>
              <p>
                <b>Description:</b> &nbsp;{selectedApi.description}
              </p>
              <div className="div-for-api-testing-inputs">
                {/* Input fields */}
                <input
                  type="text"
                  placeholder="Data Type"
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Rate Limit"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Lines Count"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </div>
              <div className="test-button-testing-api">
                {/* Test button */}
                <button onClick={handleTestButtonClick}>Test</button>
              </div>
              {/* Display additional content here */}
              {selectedApi.content && (
                <div>
                  <h6>Additional Content</h6>
                  <p>{selectedApi.content}</p>
                </div>
              )}
            </>
          ) : (
            <p>Select an API from the list to display details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Apitesting;
