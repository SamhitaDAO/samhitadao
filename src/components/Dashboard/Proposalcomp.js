import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/dashboard/proposalcomp.css";
import { ethers } from "ethers";
import { samhitacontract, samhitatokencontract } from "../../ContractAddresses";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import SamhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

function Proposalcomp() {
  const location = useLocation();
  const { state } = location;
  console.log(location);
  console.log("IsSamhita:", state.isSamhita);
  console.log("Dao Address", state.daoAddress);
  const { id } = useParams(); // Access the DAO ID from route parameters
  const [isSamhita, setIsSamhita] = useState(false); // Default value is false
  const [daoAddress, setDaoAddress] = useState(null);
  const [showsamhitaproposalcount, setshowsamhitaproposalcount] = useState();
  const [allProposals, setAllProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [proposalTitles, setProposalTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    if (state) {
      const { isSamhita, daoAddress } = state;
      setIsSamhita(isSamhita);
      setDaoAddress(daoAddress);
    }
  }, [state]);

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
        if (chainId === 199) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const vote = isUpvote ? true : false;
          const result = await contract.castVote(proposalId, vote);
          console.log("Vote cast result:", result);
        } else {
          alert("Please connect to the BitTorrent Chain Mainnet!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const getproposalcount = async () => {
    console.log("Entered into proposal counting function");
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
        if (chainId === 199) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const proposal_count = await contract.proposalCount();
          console.log(
            "Total Samhita Proposal Count:",
            proposal_count.toNumber()
          );
          const Totalsamhitaproposalcount = proposal_count.toNumber();
          setshowsamhitaproposalcount(Totalsamhitaproposalcount);
          return Totalsamhitaproposalcount;
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const displayallproposal = async () => {
    console.log("Entering into display all samhita proposal function");
    setIsLoading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const proposalCount = await contract.proposalCount();
          const allProposals = [];

          for (let i = 1; i <= proposalCount; i++) {
            const proposal = await contract.proposals(i);
            const basicData = await contract.proposalsBasicData(i);
            console.log(`File: ${basicData.proposalFile}`);

            allProposals.push({
              proposalId: i,
              title: basicData.title,
              description: basicData.description,
              category: basicData.category,
              fileLink: basicData.proposalFile,
              creator: basicData.creator,
              startBlock: proposal.startBlock,
              endBlock: proposal.endBlock,
            });
            console.log(proposal.startBlock);
            console.log(proposal.endBlock);
          }

          setAllProposals(allProposals);
          setIsLoading(false);
          const allProposalTitles = allProposals.map(
            (proposal) => proposal.title
          );
          setProposalTitles(allProposalTitles);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    displayallproposal();
  }, []);

  function formatUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  const [dropdown2Value, setDropdown2Value] = useState("");
  const [dropdown3Value, setDropdown3Value] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDropdown1Change = (event) => {
    const selectedTitle = event.target.value;
    setSelectedProposal(
      allProposals.find((proposal) => proposal.title === selectedTitle)
    );
    setSelectedTitle(selectedTitle);
  };

  // const handleDropdown2Change = (event) => {
  //   setDropdown2Value(event.target.value);
  // };

  // const handleDropdown3Change = (event) => {
  //   setDropdown3Value(event.target.value);
  // };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <div>
      <div className="main-div-for-proposal-comp">
        <div className="div-for-title-proposal-comp-i">Proposals</div>
        <div className="div-for-drop-down-proposal-comp">
          <div className="dropdown-for-proposal-comp">
            <select
              value={selectedProposal ? selectedProposal.title : ""}
              onChange={handleDropdown1Change}
            >
              <option value="">ALL</option>
              {allProposals.map((proposal) => (
                <option key={proposal.proposalId} value={proposal.title}>
                  {proposal.title}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="dropdown-for-proposal-comp">
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
          </div> */}
          <div className="date-picker-proposal-comp">
            <DatePicker
              className="dropdown-for-proposal-comp"
              value="Start date"
              selected={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="date-picker-proposal-comp">
            <DatePicker
              className="dropdown-for-proposal-comp"
              value="End date"
              selected={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      </div>
      <div className="div-for-title-proposal-comp-ii">Active Proposals</div>
      <div className="cards-of-all-active-proposal-in-proposal-comp">
        {isLoading ? (
          <div className="loader-data">
            <h4>Loading...</h4>
            <h5>Fetching the Proposal Data</h5>
          </div>
        ) : (
          isSamhita &&
          allProposals.map((proposal) =>
            !selectedTitle || selectedTitle === proposal.title ? (
              <div
                className="proposal-card-in-proposal-comp"
                key={proposal.proposalId}
              >
                <div className="heading-for-proposal-comp-card">
                  {proposal.title}
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
                    {formatUnixTimestamp(proposal.startBlock)}
                    <br />
                    <label>End Date:</label> &nbsp;
                    {formatUnixTimestamp(proposal.endBlock)}
                  </div>
                  <div className="voting-button-for-proposal-comp-card">
                    <button
                      className="upvote-button-for-proposal-comp"
                      onClick={() => {
                        handlecastvoting(proposal.proposalId, true);
                      }}
                    >
                      Up Vote
                    </button>
                    <button
                      className="downvote-button-for-proposal-comp"
                      onClick={() => {
                        handlecastvoting(proposal.proposalId, false);
                      }}
                    >
                      Down Vote
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )
        )}
      </div>
    </div>
  );
}
export default Proposalcomp;
