import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/dashboard/proposalcomp.css";
import { ethers } from "ethers";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";

function Proposalcomp() {
  const handlecastvoting = async (proposalId, isUpvote) => {
    console.log("Entered into cast voting function");
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
          const vote = isUpvote ? true : false;
          const result = await contract.castVote(proposalId, vote);
          console.log("Vote cast result:", result);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
  const [dropdown3Value, setDropdown3Value] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDropdown1Change = (event) => {
    setDropdown1Value(event.target.value);
  };

  const handleDropdown2Change = (event) => {
    setDropdown2Value(event.target.value);
  };

  const handleDropdown3Change = (event) => {
    setDropdown3Value(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const proposalData = [
    {
      id: 1,
      heading: "Proposal 1",
      description:
        "This dataset contains 5.5k high-quality music captions written by musicians",
      fileLink: "link-to-file-1",
      startdate: "12/09/2023",
      enddate: "20/10/2023",
    },
    {
      id: 2,
      heading: "Proposal 2",
      description:
        "This dataset contains 5.5k high-quality music captions written by musicians",
      fileLink: "link-to-file-2",
      startdate: "23/03/2023",
      enddate: "31/03/2023",
    },
    // Add more proposal data as needed
  ];

  return (
    <div>
      <div className="main-div-for-proposal-comp">
        <div className="div-for-title-proposal-comp-i">Proposals</div>
        <div className="div-for-drop-down-proposal-comp">
          <div className="dropdown-for-proposal-comp">
            <select value={dropdown1Value} onChange={handleDropdown1Change}>
              <option value="">Select Option 1</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>

          <div className="dropdown-for-proposal-comp">
            <select value={dropdown2Value} onChange={handleDropdown2Change}>
              <option value="">Select Option 2</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>

          <div className="dropdown-for-proposal-comp">
            <select value={dropdown3Value} onChange={handleDropdown3Change}>
              <option value="">Select Option 3</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          {/* <div className="date-picker-container-proposal-comp"> */}
          <div className="date-picker-proposal-comp">
            {/* <span>Start Date:</span> */}
            <DatePicker
              className="dropdown-for-proposal-comp"
              value="Start date"
              selected={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="date-picker-proposal-comp">
            {/* <span>End Date:</span> */}
            <DatePicker
              className="dropdown-for-proposal-comp"
              value="End date"
              selected={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="div-for-title-proposal-comp-ii">Active Proposals</div>
      <div className="cards-of-all-active-proposal-in-proposal-comp">
        {proposalData.map((proposal) => (
          <div className="proposal-card-in-proposal-comp" key={proposal.id}>
            <div className="heading-for-proposal-comp-card">
              {proposal.heading}
            </div>
            <div className="div-to-center-card-data-proposal-comp">
              <div className="description-for-proposal-comp-card">
                <label>Description:</label> &nbsp;
                {proposal.description}
              </div>
              <div className="view-upload-file-for-proposal-comp-card-div">
                <label>Link:</label> &nbsp; &nbsp;
                <a
                  href={proposal.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="view-file-button-for-proposal-card">
                    View Upload File
                  </button>
                </a>
              </div>
              <div className="start-end-for-proposal-comp-card">
                <label>Start Date:</label> &nbsp;
                {proposal.startdate}
                <br />
                <label>End Date:</label> &nbsp;
                {proposal.enddate}
              </div>
              <div className="voting-button-for-proposal-comp-card">
                <button
                  className="upvote-button-for-proposal-comp"
                  onClick={() => {
                    handlecastvoting(0, true); // Call handlecastvoting with 'true' for upvote
                    // handlecastvoting(proposal.id, true); // Call handlecastvoting with 'true' for upvote
                  }}
                >
                  Up Vote
                </button>
                <button
                  className="downvote-button-for-proposal-comp"
                  onClick={() => {
                    // handlecastvoting(proposal.id, false); // Call handlecastvoting with 'false' for downvote
                    handlecastvoting(0, false); // Call handlecastvoting with 'false' for downvote
                  }}
                >
                  Down Vote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proposalcomp;
