import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Web3Storage } from "web3.storage";
import "../styles/createproposal.css";
import topCurvedLinesDAO from "../assets/yourDaos/top-curved-lines-your-dao.svg";

function CreateProposal() {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxNjc0MzQ1NzIwMzU1NjFGMTFkNTM0ODk1OTQyNTJCNjUxOTgxNjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE0NDk3OTY0MTcsIm5hbWUiOiJTYW1oaXRhREFPIn0.EdesCPnTd8cF8Z3pdC45kKrmVZqPGEzTq3RdpHI1Vh0",
  });

  const [proposalName, setProposalName] = useState();
  const [proposalDesc, setProposalDesc] = useState();
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    const fileInput = document.querySelector("#fimg");
    const CID = await client.put(fileInput.files);
    console.log(CID);
  };

  return (
    <>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="create-proposal-main-div">
            <h1 className="create-proposal-title">New Proposal</h1>
            <p className="create-proposal-desc">
              Enter the details of a new proposal and submit them.
            </p>

            <div className="create-proposal-div">
              <div>
                <label className="create-proposal-label">Title</label>
                {/* <p>Identify your proposal</p> */}
                <input
                  type="text"
                  placeholder="Enter Proposal Title"
                  onChange={(e) => {
                    setProposalName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="create-proposal-label">Description</label>
                {/* <p>An introduction of about 2-3 lines</p> */}
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  onChange={(e) => {
                    setProposalDesc(e.target.value);
                  }}
                />
              </div>
              <div className="proposal-margin-div">
                <div>
                  <label className="create-proposal-label">
                    Upload File/Folder
                  </label>
                </div>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  className="uploadfile"
                >
                  Upload a file
                  <input
                    type="file"
                    hidden
                    id="fimg"
                    onChange={() => upload()}
                  />
                </Button>
              </div>
              <div className="proposal-margin-div">
                <div>
                  <label className="create-proposal-label">Proposal Date</label>
                </div>
                <div className="uploadfile">
                  <input type="date" className="proposal-date" />
                  <input
                    type="date"
                    className="proposal-date  proposal-date1"
                  />
                </div>
              </div>
              <div className="uploadfile">
                {!loading ? (
                  <Button variant="contained" size="large">
                    Create Proposal
                  </Button>
                ) : (
                  <div className="alldao-load">
                    <svg
                      className="animate-spin button-spin-svg-pic"
                      version="1.1"
                      id="L9"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                    >
                      <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProposal;
