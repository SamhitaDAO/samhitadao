import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Detailsofthedao from "../yourDAOs/Detailsofthedao";
import "../../styles/yourDAOS/joineddao.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import { samhitacontract } from "../../ContractAddresses";

function Joineddao() {
  const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);
  const [ismembersamhita, setismembersamhita] = useState(false);
  const [joinedDaos, setJoinedDaos] = useState([]);

  const getsamhitajoined = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const user = signer.getAddress();
          console.log(user);
          const hasjoined = await contract.isMemberAdded(user);
          console.log(hasjoined);
          setismembersamhita(hasjoined);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  useEffect(() => {
    getsamhitajoined();
  }, []);

  const handleViewMoreClick = () => {
    // Navigate to the "go-to-main-dashboard" route
    navigate("/go-to-main-dashboard");
  };

  const daoData = [
    {
      id: 1,
      daoName: "Sanskrit DAO",
      description:
        "This is the DAO for the Sanskrit language. Sanskrit is one of the 22 official languages of India, and it is the second official language of two states in northern India. The English language has a rich literary history and body of written works.",
    },
    {
      id: 2,
      daoName: "gujarati DAO",
      description:
        "This is the DAO for the Sanskrit language. Sanskrit is one of the 22 official languages of India, and it is the second official language of two states in northern India. The English language has a rich literary history and body of written works.",
    },
  ];

  return (
    <div>
      <div className="main-div-of-the-joined-dao">
        <div className="card-of-the-joined-dao">
          <div className="card-headerof-the-joined-dao">
            <h2>Samhita DAO</h2>
          </div>
          <div className="card-body-of-the-joined-dao">
            <p>
              Samhita DAO was born from a deep sense of urgency to save
              endangered languages from disappearing into oblivion. Samhita DAO
              is empowering communities to create dictionaries, grammar guides,
              and oral histories that capture the essence of their language.
            </p>
          </div>
          <div className="card-footer-of-the-joined-dao">
            <div className="div-for-button-of-the-joined-dao">
              <button
                className="view-button-of-the-joined-dao"
                onClick={handleViewMoreClick} // Navigate to the dashboard
              >
                View More
                <FontAwesomeIcon
                  className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                  icon={faArrowRight}
                />
              </button>
            </div>
          </div>
        </div>

        {joinedDaos.map((dao) => (
          <div key={dao.id} className="card-of-the-joined-dao">
            <div className="card-headerof-the-joined-dao">
              <h2>{dao.daoName}</h2>
            </div>
            <div className="card-body-of-the-joined-dao">
              <p>{dao.description}</p>
            </div>
            <div className="card-footer-of-the-joined-dao">
              <div className="div-for-button-of-the-joined-dao">
                <button
                  className="view-button-of-the-joined-dao"
                  onClick={handleViewMoreClick} // Navigate to the dashboard
                >
                  View More
                  <FontAwesomeIcon
                    className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                    icon={faArrowRight}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Joineddao;
