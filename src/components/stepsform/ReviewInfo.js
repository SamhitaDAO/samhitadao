import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContractFactory, ethers } from "ethers";
import { useAccount } from "wagmi";
import { ConstructionOutlined } from "@mui/icons-material";
// contract address and ABI
import { samhitacontract } from "../../ContractAddresses";
import samhitaABI from "../../Samhita Artifacts/samhita.json";
import { languagedaofactory } from "../../ContractAddresses";
import languagedaofactoryABI from "../../Samhita Artifacts/languagedaofactory.json";
import { templatenftcontract } from "../../ContractAddresses";
import { timelockcontract } from "../../ContractAddresses";
import templatenftABI from "../../Samhita Artifacts/templatenft.json";
import languagetokenABI from "../../Samhita Artifacts/languagetoken.json";
import languagedaoABI from "../../Samhita Artifacts/languagedao.json";

function ReviewInfo({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const { address } = useAccount();
  const [btnloading, setbtnloading] = useState(false);
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState("panel1");

  const getContract = async () => {
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
            languagedaofactory,
            languagedaofactoryABI.abi,
            signer
          );

          return contract;
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const luanchDataDao = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    console.log("entered launch dao button");
    console.log(dataDaoDetails);
    console.log(dataDaoDetails.token_holders[0].tokenHolders);
    console.log(dataDaoDetails.token_holders[0].tokenHolderBalance);
    const votingPeriodEpoch =
      Math.floor(dataDaoDetails.vote_period_day) * 86400 +
      Math.floor(dataDaoDetails.vote_period_hour) * 3600 +
      Math.floor(dataDaoDetails.vote_period_minutes) * 60;
    try {
      setbtnloading(true);
      const contract = await getContract();
      console.log(contract);
      const tokenFactory = new ContractFactory(
        languagetokenABI.abi,
        languagetokenABI.bytecode,
        signer
      );
      console.log("languagetoken");
      console.log(
        ethers.utils.parseEther(
          String(dataDaoDetails.token_holders[0].tokenHolderBalance)
        )
      );
      console.log("Deploying the tokencontract");

      const tokenContract = await tokenFactory.deploy(
        dataDaoDetails.token_name,
        dataDaoDetails.token_symbol,
        ethers.utils.parseEther(
          String(dataDaoDetails.token_holders[0].tokenHolderBalance)
        )
      );
      const tokenAddress = tokenContract.address;
      console.log(tokenAddress);
      console.log("languagetoken deployed");

      const languageFactory = new ContractFactory(
        languagedaoABI.abi,
        languagedaoABI.bytecode,
        signer
      );

      console.log("languagefactory done");

      const languageContract = await languageFactory.deploy(
        // samhitacontract,
        timelockcontract,
        tokenAddress,
        templatenftcontract,
        "https://bafybeicwih4oitj7d4tjjfl4yxakcszb4bfv7spvclxshf3qpy6kibeafa.ipfs.w3s.link/nft%20for%20samhita.png"
      );

      const languageDaoAddress = languageContract.address;
      console.log(languageDaoAddress);
      console.log("language factory deployed");
      console.log("transferring");

      const con = new ethers.Contract(
        tokenAddress,
        languagetokenABI.abi,
        signer
      );
      const tx1 = await con.transfer(
        languageDaoAddress,
        ethers.utils.parseEther(
          String(dataDaoDetails.token_holders[0].tokenHolderBalance / 2)
        )
      );
      await tx1.wait();
      console.log("transferred");

      console.log("config");
      const lanContract = new ethers.Contract(
        languageDaoAddress,
        languagedaoABI.abi,
        signer
      );
      // const tx3 = await lanContract.setDataDaoVotingConfig(
      //   dataDaoDetails.vote_condition,
      //   dataDaoDetails.vote_minapproval,
      //   votingPeriodEpoch,
      //   ethers.utils.parseEther(String(dataDaoDetails.vote_stake)),
      //   ethers.utils.parseEther(String(dataDaoDetails.proposal_stake))
      // );
      // await tx3.wait();
      const zero = 0;
      console.log("creating");
      console.log(languageDaoAddress);
      console.log(dataDaoDetails.name);
      console.log(dataDaoDetails.description);
      console.log(tokenAddress);
      console.log(dataDaoDetails.token_holders[0].tokenHolderBalance);
      const tx = await contract.createDataDao(
        // "0x23dc970C213d1e5f6324cD18a3854066F5F67408",
        // "Gujarati",
        // "Gujarati is an Indo-Aryan language native to the Indian state of Gujarat and spoken predominantly by the Gujarati people. Gujarati is descended from Old Gujarati. In India",
        // "0x51C650E529924d9004B456E4Cce7C23C511E7Ab5",
        // 0,
        // 1000
        languageDaoAddress,
        dataDaoDetails.name,
        dataDaoDetails.description,
        tokenAddress,
        zero,
        dataDaoDetails.token_holders[0].tokenHolderBalance //total supply
      );
      await tx.wait(); //dataDaoAddress,name, description, token, tokenPrice, totalSupply
      setbtnloading(false);
      console.log("finallyyy");
      navigate("/main-page-your-daos");
    } catch (error) {
      console.log(error);
      alert(error["message"]);
      setbtnloading(false);
    }
  };

  return (
    <div className="create-dao-info-main">
      {/* <button onClick={() => getContract()}>contract</button> */}
      <h1>Review Information</h1>
      <div className="review-main">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              LanguageDAO Information
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              NAME
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.name}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
                color: "#ff5f00",
              }}
            >
              DESCRIPTION
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Votting Settings
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              You are currently not an owner
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              QUORUM %
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.vote_condition} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              MINIMAL APPROVAL %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_minapproval} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              Voting Period
            </Typography>

            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_period_day +
                " day, " +
                dataDaoDetails.vote_period_hour +
                " hours, " +
                dataDaoDetails.vote_period_minutes +
                " minutes. "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Token Configuration
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              Filtering has been entirely disabled for whole web server
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              TOKEN NAME & SYMBOL
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.token_name +
                " (" +
                dataDaoDetails.token_symbol +
                ")"}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              TOKEN HOLDERS
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.token_holders[0].tokenHolders +
                " - " +
                dataDaoDetails.token_holders[0].tokenHolderBalance}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="create-dao-next launch-dao"
          onClick={() => {
            luanchDataDao();
          }}
        >
          {btnloading ? (
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
          ) : (
            <>Launch DAO</>
          )}
        </button>
      </div>
    </div>
  );
}

export default ReviewInfo;
