import React from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/yourDAOS/detailsofthedao.css";

function Samhitadaodetail() {
  // Sample data representing DAOs
  const daoData = [
    {
      tokenName: "Token A",
      numberOfTokens: 1000,
    },
    // {
    //   tokenName: "Token B",
    //   numberOfTokens: 500,
    // },
    // Add more DAO objects as needed
  ];

  return (
    <div>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="main-page-of-the-detail-dao">
            <div className="dao-table-of-the-detail-dao">
              <table>
                <thead>
                  <tr>
                    <th>Token Name</th>
                    <th>Number of Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {daoData.map((dao, index) => (
                    <tr key={index}>
                      <td>{dao.tokenName}</td>
                      <td>{dao.numberOfTokens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="div-for-available-templates-in-the-detail-dao">
                <h1>Available Templates</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Samhitadaodetail;
