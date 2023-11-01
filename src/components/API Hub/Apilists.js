import React, { useState } from "react";
import "../../styles/apihub/apilists.css";
import Apitesting from "./Apitesting"; // Import the Apitesting component

function Apilists({ onSelectApi }) {
  // Sample list of APIs with titles and descriptions
  const initialApiList = [
    {
      title: "Gujarati Alphabets",
      description: "Aphabets of Gujarati Language",
    },
    {
      title: "English Alphabets",
      description: "Aphabets of English Language",
    },
    {
      title: "Hindi Poems",
      description: "Contains Poems of Hindi Language",
    },
    // Add more API objects with titles and descriptions as needed
  ];

  const [apiList, setApiList] = useState(initialApiList);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredList = initialApiList.filter(
      (api) =>
        api.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        api.description.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setApiList(filteredList);
  };

  // Function to handle API item click and set the selected API
  const handleApiItemClick = (api) => {
    // Call the onSelectApi function passed as a prop
    onSelectApi(api);
  };

  return (
    <div className="api-card">
      <h1 className="api-card-header">API Collection</h1>
      <div className="search-filter-div">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <div className="fa fa-filter filter-icon"></div>
        </div>
      </div>
      <div className="div-to-flex-list-and-test">
        <div className="api-list-container">
          <ul className="api-list">
            {apiList.map((api, index) => (
              <li key={index} onClick={() => handleApiItemClick(api)}>
                <h6>{api.title}</h6>
                <p>{api.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Apilists;
