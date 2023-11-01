import React, { useState } from "react";
import "../../styles/yourDAOS/createddao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Detailsofthedao from "../yourDAOs/Detailsofthedao";
import { useNavigate } from "react-router-dom";

function Createddao() {
  const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);

  const handleViewMoreClick = (dao) => {
    setSelectedDao(dao);
    navigate(`/go-to-main-dashboard/${dao.id}`);
  };

  // Sample data representing DAOs
  const daoData = [
    {
      id: 1,
      header: "Sanskrit DAO",
      description:
        "This is the DAO for the Sanskrit language. Sanskrit is one of the 22 official languages of India, and it is the second official language of two states in northern India. The English language has a rich literary history and body of written works. The creation of Sanskrit was thought to have been done by the god Brahma. Let's preserve this ancient language together.",
    },
    {
      id: 2,
      header: "Hindi DAO",
      description:
        "What is the introduction of Hindi. Hindi is derived from Prakrit from which the Indo-Aryan languages are derived. Hindi is heavily influenced by Urdu and even Persian, although it still retains the Devanagari script of Sanskrit.",
    },
    // Add more DAO objects as needed
  ];

  return (
    <div>
      <div className="main-container-of-the-create-dao">
        {daoData.map((dao) => (
          <div key={dao.id} className="card-of-the-joined-dao">
            <div className="card-headerof-the-joined-dao">
              <h2>{dao.header}</h2>
            </div>
            <div className="card-body-of-the-joined-dao">
              <p>{dao.description}</p>
            </div>
            <div className="card-footer-of-the-joined-dao">
              <div className="div-for-button-of-the-joined-dao">
                {selectedDao && selectedDao.id === dao.id ? (
                  // Render the Detailsofthedao component when the button is clicked
                  <Detailsofthedao dao={selectedDao} />
                ) : (
                  <button
                    className="view-more-button-of-the-create-dao"
                    onClick={() => handleViewMoreClick(dao)}
                  >
                    View More{" "}
                    <FontAwesomeIcon
                      className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                      icon={faArrowRight}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createddao;
