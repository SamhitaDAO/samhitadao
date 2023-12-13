import React, { useState } from "react";
import "../../styles/dashboard/createproposalpopup.css";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import { samhitacontract } from "../../ContractAddresses";
import samhitaABI from "../../Samhita Artifacts/samhita.json";
import { samhitatokencontract } from "../../ContractAddresses";
import samhitatokenABI from "../../Samhita Artifacts/samhitaToken.json";

function Samhitacreateproposalpopup({ onClose }) {
  const [proposalcid, setproposalcid] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    category: "select", // Default value for category
  });

  const createsamhitaproposal = async (formData) => {
    console.log("create samhita proposal started");
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
            samhitaABI.abi,
            signer
          );

          const tokencontract = new ethers.Contract(
            samhitatokencontract,
            samhitatokenABI.abi,
            signer
          );

          console.log("getting the form data");
          const stakeAmount = await contract.proposalStake();
          const delegatee = await tokencontract.delegate(signer.getAddress());
          await delegatee.wait();
          // Prepare the proposal data
          const { title, description, file, category } = formData;

          // Get the CID link from the input field
          const proposalFileCID = proposalcid;

          // Convert the category to lowercase
          const lowercaseCategory = category.toLowerCase();

          // Prepare the proposal data for the contract function
          const targets = []; // Fill in your contract-specific data
          // const values = []; // Fill in your contract-specific data
          // const signatures = []; // Fill in your contract-specific data
          // const calldatas = []; // Fill in your contract-specific data

          // Call the smart contract function
          // const proposalId = await contract.propose(
          //   targets,
          //   values,
          //   signatures,
          //   calldatas,
          //   title,
          //   description,
          //   proposalFileCID,
          //   lowercaseCategory
          // );
          console.log("calling function from contract");
          const proposalId = await contract.propose(
            ["0x942732C97A710a22Fe9c68f62582Aa99520e1B69"],
            [0],
            ["execute(uint)"],
            [ethers.utils.defaultAbiCoder.encode(["uint256"], [42])],
            title,
            description,
            proposalFileCID,
            lowercaseCategory,
            { value: stakeAmount }
          );

          console.log("Proposal created with ID:", proposalId);
        } else {
          alert("Please connect to the BitTorrent Chain Mainnet!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleGetCIDLink = async () => {
    const { file } = formData;

    if (file) {
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRhNDBCNzA3QUU5NTZCQTg2NzQyNzdjNWRBRDE2NGZkZWNlQTVBNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMyODYzMjk4NDEsIm5hbWUiOiJkZW1vIGFwcCAifQ.5MSMQY-ZPWuMNJQrFFrguMuYlqeoDHyMuweHu57xRyQ",
      });

      try {
        const cid = await client.put([file]);
        console.log("Uploaded CID:", cid);
        setproposalcid(`https://${cid}.ipfs.w3s.link/${formData.file.name}`);
      } catch (error) {
        console.error("Error uploading file to Web3.Storage:", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createsamhitaproposal(formData);
    // ... (the code for submitting data remains the same)
  };

  return (
    <div className="popup-overlay-proposal-popup">
      <div className="popup-container-proposal-popup">
        <div className="heading-for-proposal-popup">New Proposal</div>
        <div className="heading-for-proposal-popup-ii">
          Enter the details of a new Proposal and submit them.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group-proposal-popup">
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-proposal-popup">
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-proposal-popup">
            <label htmlFor="category">Category</label>
            <br />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="select">Select Category</option>
              <option value="finance">Finance</option>
              <option value="governance">Governance</option>
              <option value="business">Business</option>
              {/* Add more category options as needed */}
            </select>
          </div>
          <div className="form-group-proposal-popup">
            <label htmlFor="file">File</label>
            <br />
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf, .jpg, .jpeg, .png"
              required
            />
          </div>
          <button type="button" onClick={handleGetCIDLink}>
            Get CID Link
          </button>
          <div className="input-form-div-datascrape">
            <label htmlFor="cidLink">CID Link</label>
            <br />
            <input
              type="text"
              id="cidLink"
              name="cidLink"
              value={proposalcid}
            />
          </div>
          <div className="form-group-proposal-popup-btn">
            <button
              type="submit"
              className="submit-btn-proposal-popup"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="close-btn-proposal-popup"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Samhitacreateproposalpopup;
