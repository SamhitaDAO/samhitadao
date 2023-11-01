import React, { useEffect, useRef, useState } from "react";
import "../styles/availabelproposal.scss";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Modal, TextField } from "@mui/material";
import "../styles/createproposal.css";
import uploadfile from "../assets/upload.png";
import { ethers } from "ethers";
import languageDAOAbi from "../contracts/artifacts/LanguageDAO.json";
import samhitaABI from "../contracts/artifacts/Samhita.json";
import erc20Abi from "../contracts/artifacts/ERC20.json";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";
const samhitaAddress = "0xdD49b7C3314C77a7264B192db0f03eEc3eC9DBCc";
const samhitaTokenAddress = "0x2e67B75dD216E50776b5118f79DaEa20B41b149a";
const languageFactoryAddress = "0x3af7E38CcBA75d3dC08145eA3B292AfaD5F12602";

function hexToTimestamp(hex) {
  const unixTimestamp = parseInt(hex, 16);
  const date = new Date(unixTimestamp * 1000);
  const localDate = date.toLocaleString("en-US");
  return localDate;
}

function AvailabelProposal({ daoAddress, isSamhita }) {
  const inputRef1 = useRef();
  const inputRef3 = useRef();
  console.log(isSamhita);
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upvoteLoading, setUpvoteLoading] = useState(false);
  const [downvoteLoading, setDownvoteLoading] = useState(false);

  const getProposals = async () => {
    console.log(daoAddress);

    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          if (isSamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const allProposals = await contract.gateAllProposals();
            console.log(allProposals);
            setProposals(allProposals);
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const allProposals = await contract.getAllProposals();
            console.log(allProposals);
            setProposals(allProposals);
          }
        }
        // else {
        //   alert("Please connect to the BitTorrent Chain Donau!");
        // }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const upVote = async (id) => {
    const { ethereum } = window;
    console.log(id);
    setUpvoteLoading(true);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log(chainId);
        if (chainId === 199) {
          console.log(isSamhita);
          if (isSamhita) {
            const contract = new ethers.Contract(
              daoAddress,
              samhitaABI,
              signer
            );
            const erc20Contract = new ethers.Contract(
              samhitaTokenAddress,
              erc20Abi.abi,
              signer
            );
            const config = await contract.getSamhitaDAOVotingConfig();
            const tx1 = await erc20Contract.approve(samhitaAddress, config[4]);
            await tx1.wait();

            console.log("inside");
            const tx = await contract.upvoteProposal(id);
            tx.wait();
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const config = await contract.getDataDaoVotingConfig();
            console.log(config);
            const factoryContract = new ethers.Contract(
              languageFactoryAddress,
              languageFactoryAbi,
              signer
            );
            const all = await factoryContract.getAllDataDaos();
            let languageTokenAddress;
            for (let i = 0; i < all.length; i++) {
              if (all[i].dataDaoAddress === daoAddress) {
                languageTokenAddress = all[i].dataDAOTokenAddress;
              }
            }
            const erc20Contract = new ethers.Contract(
              languageTokenAddress,
              erc20Abi.abi,
              signer
            );
            const tx1 = await erc20Contract.approve(daoAddress, config[3]);
            await tx1.wait();
            const tx = await contract.upvoteProposal(id, {
              // value: ethers.utils.parseEther("0.01"),
              value: String(config.votingStake),
            });
            await tx.wait();
            setUpvoteLoading(false);
          }
        } else {
          // alert("Please connect to the BitTorrent Chain Donau!");
          setUpvoteLoading(false);
        }
      }
    } catch (error) {
      setUpvoteLoading(false);
      console.log(error);
      alert(error["message"]);
    }
  };

  const downVote = async (id) => {
    const { ethereum } = window;
    setDownvoteLoading(true);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          if (isSamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );

            const erc20Contract = new ethers.Contract(
              samhitaTokenAddress,
              erc20Abi.abi,
              signer
            );
            const config = await contract.getSamhitaDAOVotingConfig();
            const tx1 = await erc20Contract.approve(samhitaAddress, config[4]);
            await tx1.wait();
            const tx = await contract.downvoteProposal(id);
            tx.wait();
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const config = await contract.getDataDaoVotingConfig();
            console.log(config);
            const factoryContract = new ethers.Contract(
              languageFactoryAddress,
              languageFactoryAbi,
              signer
            );
            const all = await factoryContract.getAllDataDaos();
            let languageTokenAddress;
            for (let i = 0; i < all.length; i++) {
              if (all[i].dataDaoAddress === daoAddress) {
                languageTokenAddress = all[i].dataDAOTokenAddress;
              }
            }
            const erc20Contract = new ethers.Contract(
              languageTokenAddress,
              erc20Abi.abi,
              signer
            );
            const tx1 = await erc20Contract.approve(daoAddress, config[3]);
            await tx1.wait();
            const tx = await contract.downvoteProposal(id, {
              // value: ethers.utils.parseEther("0.01"),
              value: String(config.votingStake),
            });
            await tx.wait();
            setDownvoteLoading(false);
          }
        }
        // else {
        //   alert("Please connect to the BitTorrent Chain Donau!");
        // }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
      setDownvoteLoading(false);
    }
  };

  const result = async (id, template_id) => {
    const { ethereum } = window;
    setLoading(true);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          if (daoAddress.issamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const tx = await contract.votingResult(id);
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const tx = await contract.votingResult(id, template_id);
            await tx.wait();
            setLoading(false);
          }
        }
        // else {
        //   alert("Please connect to the BitTorrent Chain Donau!");
        // }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <>
      <div className="availabel-proposal-main-div">
        <div className="availabel-proposal">
          <div className="availabel-proposal-section1">
            <div className="A-proposal-title">Proposals</div>
            <div className="create-proposal-parent"></div>
          </div>
          <div className="availabel-proposal-section2">
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">Status</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Open</MenuItem>
                  <MenuItem value={30}>Closed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">Outcomes</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Outcomes"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Passed</MenuItem>
                  <MenuItem value={30}>Rejected</MenuItem>
                  <MenuItem value={30}>Pending</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">App</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="App"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Voting</MenuItem>
                  <MenuItem value={30}>Tokens</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <input
                type="text"
                className="proposal-date"
                placeholder="Start-Date"
                ref={inputRef1}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (inputRef1.current.type = "date")}
                onBlur={() => (inputRef1.current.type = "text")}
              />
            </div>
            <div>
              <input
                type="text"
                className="proposal-date"
                placeholder="End-Date"
                ref={inputRef3}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (inputRef3.current.type = "date")}
                onBlur={() => (inputRef3.current.type = "text")}
              />
            </div>
          </div>
          <div className="availabel-proposal-section3">
            <div className="A-proposal-title A-proposal-title2">Proposals</div>
            <Box sx={{ width: "100%" }}>
              {proposals.length > 0
                ? proposals.map((items) => {
                    return (
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div className="proposal-details">
                            <table>
                              <thead>
                                <tr>
                                  <th>{items.proposalName}</th>
                                </tr>
                                {!items.votingResult ? (
                                  <tr>
                                    <button
                                      className="available-proposal-activebtn"
                                      onClick={() =>
                                        result(
                                          items.proposalID,
                                          items.templateId
                                        )
                                      }
                                    >
                                      Active
                                    </button>
                                  </tr>
                                ) : (
                                  <tr>
                                    <div className="proposal-inactive">
                                      Inactive
                                    </div>
                                  </tr>
                                )}
                              </thead>
                              <tbody>
                                <tr className="proposal-details-content">
                                  <label>Description</label>
                                  <td className="p-details-content">
                                    {items.proposalDescription}
                                  </td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>Proposal File </label>
                                  <td>
                                    <a
                                      href={
                                        isSamhita
                                          ? items.proposalFile
                                          : items.proposalIamge
                                      }
                                      target="_blank"
                                    >
                                      {isSamhita
                                        ? items.proposalFile
                                        : items.proposalIamge}
                                    </a>
                                  </td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>Creator:</label>

                                  <td>
                                    {" "}
                                    <p className=" my-auto">
                                      {items.proposalCreator.substring(0, 6) +
                                        "..." +
                                        items.proposalCreator.substring(
                                          items.proposalCreator.length - 5,
                                          items.proposalCreator.length
                                        )}
                                    </p>
                                  </td>
                                </tr>
                                {isSamhita ? (
                                  <tr className="proposal-details-content">
                                    <label>Category</label>
                                    <td>{items.category}</td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                <tr className="proposal-details-content">
                                  <label>Created-At: </label>
                                  <td>
                                    {" "}
                                    {hexToTimestamp(items.proposedAt._hex)}
                                  </td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>End-At: </label>
                                  <td>
                                    {hexToTimestamp(items.proposedAt._hex)}
                                  </td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>Status: </label>
                                  <td>{items.status}</td>
                                </tr>
                                <tr>
                                  <td className="vote-btns">
                                    {!upvoteLoading ? (
                                      <button
                                        className="rounded-view-data-dao-button button-to-view-more mb-3"
                                        onClick={() =>
                                          upVote(parseInt(items.proposalID, 16))
                                        }
                                      >
                                        <span className="view-button-text">
                                          Up Vote
                                        </span>
                                        <span className="view-circle d-flex justify-content-center align-items-center ">
                                          <i className="fas fa-arrow-right view-arrow"></i>
                                        </span>
                                      </button>
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
                                    {!downvoteLoading ? (
                                      <button
                                        className="rounded-join-data-dao-button button-to-join mb-3"
                                        onClick={() =>
                                          downVote(
                                            parseInt(items.proposalID, 16)
                                          )
                                        }
                                      >
                                        {" "}
                                        <span className="join-button-text">
                                          Down Vote
                                        </span>
                                        <span className="join-circle d-flex justify-content-center align-items-center ">
                                          <i className="fas fa-arrow-right join-arrow"></i>
                                        </span>
                                      </button>
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
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Grid>
                      </Grid>
                    );
                  })
                : "no proposals"}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabelProposal;
