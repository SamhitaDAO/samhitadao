import React, { useState } from "react";
import "../../styles/dashboard/dashboardcomp.css";
import proposal from "../../assets/Dashbaord/Proposal.jpg";
import daodetail from "../../assets/Dashbaord/Daodetail.jpg";
import template from "../../assets/Dashbaord/template.jpg";
import Proposalcomp from "./Proposalcomp";
import Templatecomp from "./Templatecomp";

function Dashboardcomp() {
  // Sample data for the cards
  const cardsData = [
    {
      id: 1,
      imageSrc: proposal,
      name: "Proposals",
      description:
        "Check all the Active Proposals and contribute to your Language DAO",
    },
    {
      id: 2,
      imageSrc: daodetail,
      name: "DAO Details",
      description:
        "Check all the data daos that you have created and contribute in it to build your community !",
    },
    {
      id: 3,
      imageSrc: template,
      name: "Template",
      description:
        "Check all the data daos available in the platform and be part of one you like the most",
    },
  ];

  return (
    <div>
      <div className="main-div-for-dashboard-comp">
        <div className="div-contains-heading-of-dashboard-comp">
          <div className="heading-of-the-dashboard-comp-i">
            Manage Your DataDAO
          </div>
          <div className="heading-of-the-dashboard-comp-ii">
            Click on any datadao to open a dashboard for that DAO.
          </div>
        </div>
        <div className="div-contains-cards-of-the-dashboard-comp">
          {cardsData.map((card) => (
            <div className="card-of-the-dashboard-comp" key={card.id}>
              <img
                className="image-of-the-card-dashboard-comp"
                src={card.imageSrc}
                alt={card.name}
              />
              <h3 className="title-of-card-dashboard-comp">{card.name}</h3>
              <p className="des-of-card-of-dashboard-comp">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboardcomp;
