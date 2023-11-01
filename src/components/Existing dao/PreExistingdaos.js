import React, { useState, useEffect } from "react";
// import { BigNumber } from "bignumber.js";
import { useNavigate } from "react-router-dom";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/existingdaos/preexistingdao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";

// const samhitacontract = "0x912E7159bd7dd108e524311bf66266519f7400fa";
// const samhitatokencontract = "0xDC650B06E859051D42360913534D6589cc86a672";

function PreExistingdaos({ props, onclose }) {
  // const { isSamhitaMember, onMembershipStatusChange } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [txloading, settxloading] = useState(false);
  const [membermsg, setmembermsg] = useState(false);
  const [hasjoinsamhita, sethasjoinsamhita] = useState(false);
  const [issamhitajoined, setissamhitajoined] = useState(false);
  // const [hassamhitaJoined, setHassamhitaJoined] = useState(false);
  // const [isSamhitaMember, setIsSamhitaMember] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (event) => {
    setTokensToPurchase(event.target.value);
  };

  const handlePayButtonClick = async () => {
    console.log("Join Samhita");
    // setLoading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(await signer.getAddress());
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
          const tokenContract = new ethers.Contract(
            samhitatokencontract,
            SamhitaTokenABI.abi,
            signer
          );
          const price = await tokenContract.getTokenPrice();
          // console.log(price);
          const decimal_price = parseInt(price._hex, 16);
          // console.log(decimal_price);
          console.log(tokensToPurchase);
          const value = tokensToPurchase * decimal_price;
          console.log(value);
          settxloading(true);
          const tx = await contract.addMember(tokensToPurchase, {
            value: String(value),
          });
          await tx.wait();
          console.log("Congratulatons you're member of Samhita DAO");
          settxloading(false);

          // setissamhitajoined(true);
          // setHassamhitaJoined(true);
          sethasjoinsamhita(true);
          setmembermsg(true);
          setTimeout(() => {
            togglePopup(); // Close the popup
          }, 3000);
          // onclose();
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
      settxloading(false);
    }
  };

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
          // setHassamhitaJoined(hasjoined);
          sethasjoinsamhita(hasjoined);
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
  const staticDaoData = {
    daoName: "Samhita DAO",
    description:
      "Samhita DAO was born from a deep sense of urgency to save endangered languages from disappearing into oblivion. Samhita DAO is empowering communities to create dictionaries, grammar guides, and oral histories that capture the essence of their language.",
  };

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
              <div className="div-for-existing-dao-card">
                <div className="div-for-samhita-dao-card">
                  <div className="dao-card-of-the-create-dao">
                    <div className="header-of-the-dao-card-of-the-create-dao">
                      <h2>{staticDaoData.daoName}</h2>
                    </div>
                    <div className="description-of-the-dao-card-of-the-create-dao">
                      <p>{staticDaoData.description}</p>
                    </div>
                    <div className="samhita-address-div">{samhitacontract}</div>
                    <div className="div-to-flex-the-view-and-join-button-in-the-create-dao-pre">
                      <button
                        className="view-more-button-of-the-create-dao"
                        // onClick={daodetail()}
                      >
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
                </div>
                <div className="div-for-other-language-dao-card">
                  {daoData.map((dao) => (
                    <div key={dao.id} className="dao-card-of-the-create-dao">
                      <div className="header-of-the-dao-card-of-the-create-dao">
                        <h2>{dao.header}</h2>
                      </div>
                      <div className="description-of-the-dao-card-of-the-create-dao">
                        <p>{dao.description}</p>
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
                          Join
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
              <button
                className="pay-button"
                onClick={() => {
                  console.log("finally samhita");
                  handlePayButtonClick();
                }}
              >
                Pay
              </button>
              {txloading && <div className="loading-message">Loading...</div>}
              {membermsg && (
                <div>
                  Congratulatons, You become DAO member of Samhita DAO!!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreExistingdaos;
