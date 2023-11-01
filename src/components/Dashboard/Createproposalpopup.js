import React, { useState } from "react";
import "../../styles/dashboard/createproposalpopup.css";
import { Link } from "react-router-dom";

function Createproposalpopup({ onClose, generateCID, generateCCID }) {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   cidLink: generateCCID,
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can handle form submission logic here
  //   console.log("Form data submitted:", formData);
  //   onClose(); // Close the popup when the form is submitted
  // };

  return (
    <div className="popup-overlay-proposal-popup">
      <div className="popup-container-proposal-popup">
        <div className="heading-for-proposal-popup">New Proposal</div>
        <div className="heading-for-proposal-popup-ii">
          Enter the details of a new Proposal and submit them.
        </div>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="form-group-proposal-popup">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            // value={formData.title}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-proposal-popup">
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            // value={formData.description}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="div-to-choose-which-tool-popup">
          <h3>Choose tool to submit the your Dataset</h3>
          <Link to="/go-to-choose-template">
            <button className="upload-data-button-popup">
              Choose Data Pattern
            </button>
          </Link>
        </div>
        <div className="form-group-proposal-popup">
          <label htmlFor="cidLink">CID Link</label>
          <br />
          <input
            type="text"
            id="cidLink"
            name="cidLink"
            // value={formData.cidLink}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-proposal-popup-btn">
          <button type="submit" className="submit-btn-proposal-popup">
            Submit
          </button>
          <button
            type="button"
            className="close-btn-proposal-popup"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Createproposalpopup;
