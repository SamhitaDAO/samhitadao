import React, { useState } from "react";
import "../../styles/dashboard/createproposalpopup.css";
import { ethers } from "ethers";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import { Web3Storage } from "web3.storage";
import { samhitatokencontract } from "../../ContractAddresses";
import samhitaTokenABI from "../../Samhita Artifacts/samhitaToken.json";
const samhitacontract = "0x912E7159bd7dd108e524311bf66266519f7400fa";

function Samhitacreateproposalpopup() {
  const [proposalcid, setproposalcid] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handlesubmitalldata = async () => {
    console.log("entered to submit all data");
    console.log("form data:", formData);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(await signer.getAddress());

        if (!provider) {
          console.log("Metamask is not installed, please install!");
          return;
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
            samhitaTokenABI.abi,
            signer
          );

          const { title, description, category } = formData;
          console.log(proposalcid);
          const proposalFile = proposalcid;
          const targets = [samhitatokencontract]; // Add the target addresses as needed
          const values = [0]; // Add the values as needed
          const signatures = ["execute(uint)"]; // Add the signatures as needed
          const calldatas = [
            ethers.utils.defaultAbiCoder.encode(["uint256"], [42]),
          ]; // Add the calldatas as needed
          const stakeAmount = await contract.proposalStake();
          console.log(stakeAmount);

          await tokenContract.delegate(signer.getAddress());

          console.log(stakeAmount);
          const tx = await contract.propose(
            targets,
            values,
            signatures,
            calldatas,
            title,
            description,
            proposalFile,
            category,
            { value: stakeAmount }
          );

          await tx.wait(); // Wait for the transaction to be mined
          console.log("Proposal submitted successfully!");
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkFormCompleteness();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    checkFormCompleteness();
  };

  const checkFormCompleteness = () => {
    const { title, description, file } = formData;
    if (title.trim() !== "" && description.trim() !== "" && file) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("entered to retrieve cid");
    e.preventDefault();

    // if (!isFormComplete) {
    //   return;
    // }
    console.log("starting");
    const { title, description, file } = formData;
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRhNDBCNzA3QUU5NTZCQTg2NzQyNzdjNWRBRDE2NGZkZWNlQTVBNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMyODYzMjk4NDEsIm5hbWUiOiJkZW1vIGFwcCAifQ.5MSMQY-ZPWuMNJQrFFrguMuYlqeoDHyMuweHu57xRyQ",
    });
    console.log("started"); // Replace with your Web3.Storage API key
    try {
      // console.log("yayyyy");
      const cid = await client.put([file]);
      // You can now use the 'cid' to reference the uploaded file
      console.log("Uploaded CID:", cid);
      setproposalcid(cid);
      handlesubmitalldata();
      // Add code here to store the 'cid' in your contract or perform other actions as needed
    } catch (error) {
      console.error("Error uploading file to Web3.Storage:", error);
      // Handle the error, display a message, or take appropriate action
    }
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
          <div className="input-form-div-datascrape">
            <label htmlFor="cidLink">CID Link</label>
            <br />
            <input
              type="text"
              id="cidLink"
              name="cidLink"
              value={proposalcid}
              // value={formData.cidLink}
              // onChange={handleChange}
            />
          </div>
          <div className="form-group-proposal-popup-btn">
            <button
              onSubmit={handleSubmit}
              type="submit"
              className="submit-btn-proposal-popup"
              // disabled={!isFormComplete}
            >
              Submit
            </button>
            <button
              type="button"
              className="close-btn-proposal-popup"
              // onClick={onClose}
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
