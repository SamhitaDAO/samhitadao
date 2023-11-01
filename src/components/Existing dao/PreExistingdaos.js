import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/existingdaos/preexistingdao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";
import languagedaoABI from "../../Samhita Artifacts/languagedao.json";
import { languagedaofactory } from "../../ContractAddresses";
import languagedaofactoryABI from "../../Samhita Artifacts/languagedaofactory.json";

function PreExistingdaos({ props, onclose }) {
  const [showPopup, setShowPopup] = useState(false);
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [txloading, settxloading] = useState(false);
  const [allDataDaos, setDataDaos] = useState([]);
  const { address } = useAccount();
  const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);
  const [membermsg, setmembermsg] = useState(false);
  const [hasjoinsamhita, sethasjoinsamhita] = useState(false);
  const [issamhitajoined, setissamhitajoined] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (event) => {
    setTokensToPurchase(event.target.value);
  };

  const getAllDataDaos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            languagedaofactory,
            languagedaofactoryABI.abi,
            signer
          );
          const dataDaos = await contract.getUserDataDaos(address);
          setDataDaos(dataDaos);

          const allDAOs = await contract.getAllDataDaos();
          for (let i = 0; i < allDAOs.length; i++) {
            const languageContract = new ethers.Contract(
              allDAOs[i].dataDaoAddress,
              languagedaoABI.abi,
              signer
            );
            // const isMember = await languageContract.isMemberAdded(address);
            // if (isMember) {
            //   joinedDaos.push(allDAOs[i]);
            // }
          }
          // setJoinedDaos(joinedDaos);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllDataDaos();
  }, []);

  const handlePayButtonClick = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const tokenContract = new ethers.Contract(
            samhitatokencontract,
            SamhitaTokenABI.abi,
            signer
          );
          const price = await tokenContract.getTokenPrice();
          const decimal_price = parseInt(price._hex, 16);
          const value = tokensToPurchase * decimal_price;
          settxloading(true);
          const tx = await contract.addMember(tokensToPurchase, {
            value: String(value),
          });
          await tx.wait();
          settxloading(false);
          sethasjoinsamhita(true);
          setmembermsg(true);
          setTimeout(() => {
            togglePopup();
          }, 3000);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      settxloading(false);
    }
  };

  const getsamhitajoined = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const user = signer.getAddress();
          const hasjoined = await contract.isMemberAdded(user);
          sethasjoinsamhita(hasjoined);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getsamhitajoined();
  }, []);

  const staticDaoData = {
    daoName: "Samhita DAO",
    description:
      "Samhita DAO was born from a deep sense of urgency to save endangered languages from disappearing into oblivion. Samhita DAO is empowering communities to create dictionaries, grammar guides, and oral histories that capture the essence of their language.",
  };

  return (
    <div>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="pre-exisitng-dao-div">
            <div className="main-div-of-existing-dao">
              <div className="div-for-heading-existing-dao">
                <div className="i-heading-existing-dao">Your Language DAOs</div>
                <div className="ii-heading-existing-dao">
                  All the Language DAOs on the platform
                </div>
              </div>
              <div className="all-card-here">
                <div className="dao-card dao-card-of-the-create-dao">
                  <div className="header-of-the-dao-card-of-the-create-dao">
                    <h2>{staticDaoData.daoName}</h2>
                  </div>
                  <div className="description-of-the-dao-card-of-the-create-dao">
                    <p>{staticDaoData.description}</p>
                  </div>
                  {/* <div className="samhita-address-div">{samhitacontract}</div> */}
                  <div className="div-to-flex-the-view-and-join-button-in-the-create-dao-pre">
                    <button className="view-more-button-of-the-create-dao">
                      View More{" "}
                      <FontAwesomeIcon
                        className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                        icon={faArrowRight}
                      />
                    </button>
                    <button
                      className="join-button-of-the-create-dao"
                      onClick={togglePopup}
                      disabled={issamhitajoined || hasjoinsamhita}
                    >
                      {hasjoinsamhita ? "Joined" : "Join"}
                      <FontAwesomeIcon
                        className="right-side-icon-of-button-in-the-joined-dao-join"
                        icon={faArrowRight}
                      />
                    </button>
                  </div>
                </div>
                {allDataDaos.map((dao) => (
                  <div className="dao-card dao-card-of-the-create-dao">
                    <div className="header-of-the-dao-card-of-the-create-dao">
                      <h2>{dao.dataDaoName}</h2>
                    </div>
                    <div className="description-of-the-dao-card-of-the-create-dao">
                      <p>{dao.dataDaoDescription}</p>
                    </div>
                    <div className="div-to-flex-the-view-and-join-button-in-the-create-dao-pre">
                      <button className="view-more-button-of-the-create-dao">
                        View More
                        <FontAwesomeIcon
                          className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                          icon={faArrowRight}
                        />
                      </button>
                      <button className="join-button-of-the-create-dao">
                        {" "}
                        Join
                        {/* {hasjoinsamhita ? "Joined" : "Join"} */}
                        <FontAwesomeIcon
                          className="right-side-icon-of-button-in-the-joined-dao-join"
                          icon={faArrowRight}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="div-for-cancel-icons">
              <button className="cancel-icon" onClick={togglePopup}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="div-for-input-in-popup">
              <label>Enter Tokens</label> <br />
              <br />
              <input
                type="number"
                placeholder="Enter Token"
                className="token-input"
                value={tokensToPurchase}
                onChange={handleInputChange}
              />
            </div>
            <div className="pay-token-btton-div">
              <button className="pay-button" onClick={handlePayButtonClick}>
                Pay
              </button>
              {txloading && <div className="loading-message">Loading...</div>}
              {membermsg && (
                <div>Congratulatons, You become a member of Samhita DAO!!</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreExistingdaos;
