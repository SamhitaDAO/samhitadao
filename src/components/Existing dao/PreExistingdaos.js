import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/existingdaos/preexistingdao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faTimes,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";
import languagedaoABI from "../../Samhita Artifacts/languagedao.json";
import { languagedaofactory } from "../../ContractAddresses";
import languagedaofactoryABI from "../../Samhita Artifacts/languagedaofactory.json";
import languagetokenABI from "../../Samhita Artifacts/languagetoken.json";

function PreExistingdaos({ props, onclose }) {
  const [showPopup, setShowPopup] = useState(false);
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [txloading, settxloading] = useState(false);
  // const [langtokenamount, setlangtokenamount] = useState();
  const [allDataDaos, setDataDaos] = useState([]);
  const { address } = useAccount();
  // const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);
  const [membermsg, setmembermsg] = useState(false);
  const [hasjoinsamhita, sethasjoinsamhita] = useState(false);
  const [issamhitajoined, setissamhitajoined] = useState(false);
  const [langdaoAddress, setlangdaoAddress] = useState();
  const [langtokenaddress, setlangtokenaddress] = useState();
  const [islangjoined, setislangjoined] = useState();
  // const [langJoinedStatus, setLangJoinedStatus] = useState([]);
  // const [JoinedDaos, setJoinedDaos] = useState([]);
  const [hasJoinedValues, setHasJoinedValues] = useState([]);
  // const [selectedLangDaoAddress, setSelectedLangDaoAddress] = useState(""); // Updated state for DAO address
  // const [selectedLangTokenAddress, setSelectedLangTokenAddress] = useState("");
  const [showLangDaoPopup, setShowLangDaoPopup] = useState(false);
  const [langtokensToPurchase, setlangtokensToPurchase] = useState();
  const [diduserjoinlang, setdiduserjoinlang] = useState();
  const [joinedDaos, setJoinedDaos] = useState([]);

  // Function to add a new joined DAO to the state
  const addJoinedDao = (daoData) => {
    setJoinedDaos((prevJoinedDaos) => [...prevJoinedDaos, daoData]);
  };

  useEffect(() => {
    const initialStatus = Array(allDataDaos.length).fill(false);
    setHasJoinedValues(initialStatus);
  }, [allDataDaos]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleLangDaoPopup = () => {
    setShowLangDaoPopup(!showLangDaoPopup);
  };

  const handleInputChange = (event) => {
    setTokensToPurchase(event.target.value);
    setlangtokensToPurchase(event.target.value);
  };

  const abbreviateAddress = (address) => {
    if (address && address.length > 12) {
      return address.substring(0, 12) + " ...";
    }
    return address;
  };

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Address copied to clipboard");
  };

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

  const getAllDataDaos = async () => {
    console.log("entered Data DAO function");
    try {
      const { ethereum } = window;
      if (ethereum) {
        console.log("in");
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("out");
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
          console.log(dataDaos);
          const allDAOs = await contract.getAllDataDaos();
          console.log("allDAOS =", allDAOs);

          const newData = [];

          for (let i = 0; i < allDAOs.length; i++) {
            const languageContract = new ethers.Contract(
              allDAOs[i].dataDaoAddress,
              languagedaoABI.abi,
              signer
            );
            console.log(languageContract);
            console.log(allDAOs);
            console.log(dataDaos);

            console.log("language contract here : ", languageContract);
            console.log(
              "language contract address : ",
              languageContract.address
            );

            const daoAddress = languageContract.address;
            console.log(daoAddress);
            // const tokenAddress = dataDaos[i].dataDAOTokenAddress;
            const tokenAddress = allDAOs[i].dataDAOTokenAddress;
            console.log(tokenAddress);

            setlangdaoAddress(daoAddress);
            setlangtokenaddress(tokenAddress);

            console.log("address", allDAOs[i].dataDaoAddress);
            const user = await signer.getAddress();

            const contract = new ethers.Contract(
              allDAOs[i].dataDaoAddress,
              languagedaoABI.abi,
              signer
            );

            const joined = await contract.isMemberAdded(user);
            newData.push({
              ...allDAOs[i],
              hasJoined: joined,
            });

            console.log(newData);
            // console.log(newData[i].hasJoined);
            const islangjoin = newData[i].hasJoined;
            console.log(islangjoin);
            setdiduserjoinlang(islangjoin);
          }

          setDataDaos(newData);

          // Store the hasJoined values in the state variable
          const updatedJoinedValues = newData.map((item) => item.hasJoined);
          setHasJoinedValues(updatedJoinedValues);
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

  const joinLanguageDAO = async (daoAddress, tokenAddress, index) => {
    console.log("entered joinlanguage dao function");
    console.log("daoAddress = ", daoAddress);
    console.log("tokenAddress", tokenAddress);
    console.log("index", index);
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
            daoAddress,
            languagedaoABI.abi,
            signer
          );
          console.log(contract);
          const tokenContract = new ethers.Contract(
            tokenAddress,
            languagetokenABI.abi,
            signer
          );
          const samhitaCon = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          console.log(tokenContract);
          const price = await tokenContract.getTokenPrice();
          console.log(price);
          const tx = await contract.addMember(langtokensToPurchase, {
            value: String(langtokensToPurchase * price),
          });
          await tx.wait();
          console.log("joined this language dao");

          const joinedDao = {
            id: index, // You can generate a unique ID for each joined DAO
            daoName: "", // Set the name of the joined DAO based on the provided parameter
            description: "", // Set the description based on the provided parameter
            // Add other relevant data for the joined DAO
          };

          // Pass the joined DAO data to the Joineddao component
          setSelectedDao(joinedDao);
          // Update the hasJoined value in the state
          const updatedJoinStatus = [...hasJoinedValues];
          updatedJoinStatus[index] = true;
          setHasJoinedValues(updatedJoinStatus);

          window.location.reload();
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const getLanguageIsJoined = async (index) => {
    console.log("checking");
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
            langdaoAddress,
            SamhitaABI.abi,
            signer
          );
          const user = await signer.getAddress();
          const hasJoined = await contract.isMemberAdded(user);
          console.log(hasJoined);

          // Update the hasJoined value in the state
          const updatedJoinStatus = [...hasJoinedValues];
          updatedJoinStatus[index] = hasJoined;
          setHasJoinedValues(updatedJoinStatus);

          setislangjoined(hasJoined);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

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
                {/* <button onClick={getAllDataDaos}>allDataDaos</button>
                <button onClick={getLanguageIsJoined}>hasjoinedlang</button> */}
              </div>

              <div className="all-card-here">
                <div className="dao-card dao-card-of-the-create-dao">
                  <div className="header-of-the-dao-card-of-the-create-dao">
                    <h2>{staticDaoData.daoName}</h2>
                  </div>
                  <div className="description-of-the-dao-card-of-the-create-dao">
                    <p>{staticDaoData.description}</p>
                  </div>
                  {/* <div className="address-with-clipboard">
                    <p>
                      {abbreviateAddress(samhitacontract)}{" "}
                      <FontAwesomeIcon
                        className="clipboard-icon"
                        icon={faClipboard}
                        onClick={() => copyToClipboard(samhitacontract)}
                      />
                    </p>
                  </div> */}
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
                {allDataDaos.map((dao, index) => (
                  <div
                    className="dao-card dao-card-of-the-create-dao"
                    key={index}
                  >
                    <div className="header-of-the-dao-card-of-the-create-dao">
                      <h2>{dao.dataDaoName}</h2>
                    </div>
                    <div className="description-of-the-dao-card-of-the-create-dao">
                      <p>{dao.dataDaoDescription}</p>
                    </div>
                    {/* <div className="address-with-clipboard">
                      <p className=" my-auto">
                        {abbreviateAddress(dao.dataDaoAddress)}{" "}
                        <FontAwesomeIcon
                          className="clipboard-icon"
                          icon={faClipboard}
                          onClick={() => copyToClipboard(dao.dataDaoAddress)}
                        />
                      </p>
                    </div> */}
                    <div className="div-to-flex-the-view-and-join-button-in-the-create-dao-pre">
                      <button className="view-more-button-of-the-create-dao">
                        View More
                        <FontAwesomeIcon
                          className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                          icon={faArrowRight}
                        />
                      </button>

                      <button
                        className="join-button-of-the-create-dao"
                        onClick={() => {
                          toggleLangDaoPopup();
                          setSelectedDao(dao);
                          getLanguageIsJoined(index);
                        }}
                        // disabled={hasJoinedValues[index]}
                      >
                        {console.log(dao.hasJoined)}
                        {dao.hasJoined ? "Joined" : "Join"}
                        {/* Join */}
                        {/* {hasJoinedValues[index] ? "Joined" : "Join"} */}
                        <FontAwesomeIcon
                          className="right-side-icon-of-button-in-the-joined-dao-join"
                          icon={faArrowRight}
                        />
                      </button>
                    </div>
                    {showLangDaoPopup && selectedDao === dao && (
                      <div className="popup">
                        <div className="popup-content">
                          <div className="div-for-cancel-icons">
                            <button
                              className="cancel-icon"
                              onClick={toggleLangDaoPopup}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                          <div></div>
                          <div className="div-for-input-in-popup">
                            <label>Enter Language DAO Tokens</label>
                            <p>LanguageDAO Address: {dao.dataDaoAddress}</p>
                            <p>
                              LanguageTokenAddress: {dao.dataDAOTokenAddress}
                            </p>
                            <br />
                            <br />
                            <input
                              type="number"
                              placeholder="Enter Token"
                              className="token-input"
                              value={langtokensToPurchase}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="pay-token-btton-div">
                            <button
                              className="pay-button"
                              onClick={() =>
                                joinLanguageDAO(
                                  dao.dataDaoAddress,
                                  dao.dataDAOTokenAddress,
                                  index
                                )
                              }
                            >
                              Pay
                            </button>
                            {txloading && (
                              <div className="loading-message">Loading...</div>
                            )}
                            {membermsg && (
                              <div>
                                Congratulations, You become a member of Language
                                DAO!!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* join samhita popup */}
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
