import React from "react";
import "../../styles/dashboard/templatecomp.css";

function Templatecomp() {
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
