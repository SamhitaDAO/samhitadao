import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import Createproposalpopup from "./Createproposalpopup";
import Samhitacreateproposalpopup from "./Samhitacreateproposalpopup";
import { ethers } from "ethers";
import "../../styles/dashboard/daodetailcomp.css";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";
import { useNavigate } from "react-router-dom";

// const samhitacontract = "0x912E7159bd7dd108e524311bf66266519f7400fa";
// const samhitatokencontract = "0xDC650B06E859051D42360913534D6589cc86a672";

const datasetData = [
  {
    title: "MusicCaps",
    description:
      "This dataset contains 55k high-quality music captions written by musicians.",
    fileLink: "https://example.com/dataset1",
    date: "2023-09-18",
  },
];

function Daodetailcomp() {
  // const totalamount = value + userbuy;
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [txloading, settxloading] = useState(false);
  const [membermsg, setmembermsg] = useState(false);
  const [tokensPurchase, settokensPurchase] = useState();
  const navigate = useNavigate();
  const [isCreateProposalPopupOpen, setCreateProposalPopupOpen] =
    useState(false);

  const [ismembersamhita, setismembersamhita] = useState(false);
  const [viewMode, setViewMode] = useState("none");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (event) => {
    setTokensToPurchase(event.target.value);
  };

  const handlePayButtonClick = async () => {
    console.log("Join Samhita");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(await signer.getAddress());
        if (!provider) {
          console.log("Metamask is not installed, please install!");
          return; // Exit early if Metamask is not installed
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
          const decimal_price = parseInt(price._hex, 16);
          const value = tokensToPurchase * decimal_price; // Calculate value
          console.log(value);

          // Calculate userbuy based on the number of tokens purchased
          const userbuy = tokensToPurchase * decimal_price;
          console.log(userbuy);

          settxloading(true);
          const tx = await contract.addMember(tokensToPurchase, {
            value: String(value),
          });
          await tx.wait();
          console.log("Congratulations, you're a member of Samhita DAO");
          settxloading(false);

          const totalamount = value + userbuy;
          settokensPurchase(totalamount);
          setmembermsg(true);
          setTimeout(() => {
            togglePopup(); // Close the popup
          }, 3000);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
      settxloading(false);
    }
  };

  const openCreateProposalPopup = () => {
    setCreateProposalPopupOpen(true);
    // navigate("/createproposalpopup");
  };
  const openchoosedatapattern = () => {
    navigate("/go-to-choose-template");
  };

  const closeCreateProposalPopup = () => {
    setCreateProposalPopupOpen(false);
  };
  return (
    <div>
      <div className="main-div-for-dao-detail-comp">
        <div className="div-for-table-dao-detail-comp">
          <div className="dao-table-of-the-detail-dao">
            <table>
              <thead>
                <tr>
                  <th>Token Name</th>
                  <th>Number of Tokens</th>
                </tr>
              </thead>
              <tbody>
                {/* {daoData.map((dao, index) => (
                  <tr key={index}>
                    <td>{dao.tokenName}</td>
                    <td>{dao.numberOfTokens}</td>
                  </tr>  */}
                <tr>
                  <td>Token</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter Token"
                      className="token-input"
                      value={tokensPurchase}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-in-dao-detail-comp">
          {/* {ismembersamhita ? (
            viewMode === "createProposalSamhita" ? (
              <button onClick={openCreateProposalPopup}>Create Proposal</button>
            ) : (
              <button onClick={openchoosedatapattern}>Create Proposal</button>
            )
          ) : (
            <button onClick={openchoosedatapattern}>Create Proposal</button>
          )} */}
          <button onClick={openCreateProposalPopup}>Create Proposal</button>
        </div>
        <div className="heading-in-dao-detail-comp">Available Datasets</div>
        <div className="dataset-showcase-dao-detail-comp">
          {datasetData.map((dataset, index) => (
            <div className="dataset-card-in-dao-detail" key={index}>
              <div className="div-to-flex-the-dataset-card-in-dao-detail">
                <div className="div-i-in-dao-detail">
                  <h2>{dataset.title}</h2>
                  <p>{dataset.description}</p>
                  <a
                    href={dataset.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    File Link
                  </a>
                  <p>Date: {dataset.date}</p>
                </div>
                <div className="div-ii-in-dao-detail">
                  <button>Sell</button>
                  <br />
                  <button>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCreateProposalPopupOpen && (
        // <Createproposalpopup onClose={closeCreateProposalPopup} />
        <Samhitacreateproposalpopup onClose={closeCreateProposalPopup} />
        // <Createproposalsamhita onClose={closeCreateProposalPopup} />
      )}
    </div>
  );
}

export default Daodetailcomp;
