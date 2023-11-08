import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import { useLocation } from "react-router-dom";
import "../../styles/dashboard/templatecomp.css";

function Templatecomp() {
  const location = useLocation();
  const { state } = location;
  console.log(location);
  console.log("IsSamhita:", state.isSamhita);
  console.log("Dao Address", state.daoAddress);
  const { id } = useParams(); // Access the DAO ID from route parameters
  const [isSamhita, setIsSamhita] = useState(false); // Default value is false
  const [daoAddress, setDaoAddress] = useState(null);

  useEffect(() => {
    if (state) {
      const { isSamhita, daoAddress } = state;
      setIsSamhita(isSamhita);
      setDaoAddress(daoAddress);
    }
  }, [state]);

  // Sample data for your table
  const data = [
    {
      number: 1,
      title: "Old Song Lyrics",
      description:
        "A old folke song about the wealth and prosperty of the new land",
      file: "Lyrics.pdf",
    },
    // Add more data as needed
  ];

  return (
    <div>
      <div className="outer-div-of-template-comp">
        <div className="inner-div-of-template-comp">
          <div className="heading-div-of-template-comp">Template</div>
          <div className="table-div-of-template-comp">
            <table>
              <thead>
                <tr>
                  <th className="table-header-proposal-comp">Number</th>
                  <th className="table-header-proposal-comp">Title</th>
                  <th className="table-header-proposal-comp">Description</th>
                  <th className="table-header-proposal-comp">File</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.number}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templatecomp;
