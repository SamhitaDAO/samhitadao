import React, { useEffect, useState } from "react";
import "../styles/alldatadaos.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Arrow from "../assets/Arrow.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { ContractFactory, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner } from "wagmi";
import { useNavigate } from "react-router-dom";
import leftCurvedLinesDAO from "../assets/yourDaos/left-curved-lines-your-dao.svg";
import mainYourDAOBg from "../assets/yourDaos/main-your-dao-Bg.svg";
import topCurvedLinesDAO from "../assets/yourDaos/top-curved-lines-your-dao.svg";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";
import languageTokenAbi from "../contracts/artifacts/LanguageDAOToken.json";
import samhitaAbi from "../contracts/artifacts/Samhita.json";
import languageAbi from "../contracts/artifacts/LanguageDAO.json";
import { sign } from "@pushprotocol/restapi/src/lib/chat/helpers";
// import YourAssetsContent from "./YourAssetsContent";

// const samhitaAddress = "0xdD49b7C3314C77a7264B192db0f03eEc3eC9DBCc";
// const languageFactoryAddress = "0x3af7E38CcBA75d3dC08145eA3B292AfaD5F12602";
// const samhitaTokenAddress = "0x2e67B75dD216E50776b5118f79DaEa20B41b149a";

function YourDaos({ setSingleYourDataDao, setYourDaos, setDaoAddress }) {
  const navigate = useNavigate();

  const [allDataDaos, setDataDaos] = useState([]);
  const [joinedDaos, setJoinedDaos] = useState([]);
  const { address, isConnected } = useAccount();
  const [isJoined, setIsJoined] = useState();
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(false);
  const [isSamhita, setIsSamhita] = useState();
  const openDaoPage = (a, b) => {
    navigate("/open-existing-data-dao", { state: { data: a, address: b } });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getAllDataDaos = async () => {
  //   setLoading(true); // Corrected here to set loading to true initially
  //   try {
  //     const { ethereum } = window;
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       if (!provider) {
  //         console.log("Metamask is not installed, please install!");
  //       }
  //       const { chainId } = await provider.getNetwork();
  //       if (chainId === 199) {
  //         const samhitaContract = new ethers.Contract(
  //           samhitaAddress,
  //           samhitaAbi,
  //           signer
  //         );
  //         const isJoined = await samhitaContract.checkIsMemberAdded(address);
  //         setIsJoined(isJoined);
  //         const contract = new ethers.Contract(
  //           languageFactoryAddress,
  //           languageFactoryAbi,
  //           signer
  //         );
  //         const dataDaos = await contract.getUserDataDaos(address);
  //         setDataDaos(dataDaos);

  //         const allDAOs = await contract.getAllDataDaos();
  //         console.log(allDAOs);
  //         const joinedDaosArray = [];
  //         for (let i = 0; i < allDAOs.length; i++) {
  //           const languageContract = new ethers.Contract(
  //             allDAOs[i].dataDaoAddress,
  //             languageAbi,
  //             signer
  //           );
  //           const isMember = await languageContract.isMemberAdded(address);
  //           console.log(isMember);
  //           if (isMember) {
  //             joinedDaosArray.push(allDAOs[i]);
  //           }
  //         }
  //         setJoinedDaos(joinedDaosArray);
  //         setLoading(true);
  //       } else {
  //         alert("Please connect to the BitTorrent Chain Donau!");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert(error["message"]);
  //   }
  // };

  // useEffect(() => {
  //   getAllDataDaos();
  // }, []);

  // copy to clipboard function ***************
  const toastInfo = () => toast.success("Address Copied");
  const copyContent = async (e) => {
    try {
      await navigator.clipboard.writeText(e);
      toastInfo();
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert(err["message"]);
    }
  };

  return (
    <>
      <div className="main-your-dao">
        <div className="your-dao-bg"></div>
        <div className="your-dao-bg-images">
          <img
            src={leftCurvedLinesDAO}
            className="leftCurvedLinesDao"
            alt="leftcurve"
          />
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="topcurve"
          />
        </div>
        <div className="all-datadao-main-div">
          <div className="all-datadao-div ">
            <div className="all-datadao-section1">
              <div className="your-language-daos-title-in-your-data">
                <h1 className="all-datadao-title">Your Language DAOs</h1>
              </div>

              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      className="dcndcxdc"
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Joined DAOs" value="1" />
                      <Tab label="Created DAOs" value="2" />
                      <Tab label="Your Assets" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="your-Dao-table-data">
                      {isJoined ? (
                        <Grid item xs={4}>
                          <div className="proposal-details">
                            <table>
                              <thead>
                                <tr>
                                  <th colSpan={2}>Samhita DAO</th>
                                </tr>
                              </thead>
                              <tr>
                                <td>
                                  <p className="proposal-header">
                                    Samhita DAO was born from a deep sense of
                                    urgency to save endangered languages from
                                    disappearing into oblivion. Samhita DAO is
                                    empowering communities to create
                                    dictionaries, grammar guides, and oral
                                    histories that capture the essence of their
                                    language.
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td className="proposal-buttons">
                                  <button
                                    onClick={() =>
                                      openDaoPage(
                                        "0x14575fe559ffce940a9fc71053Bfe1316490cE2A",
                                        "0x16ebae0D7673b9e3De6D21C38237708a0Af610Ee"
                                      )
                                    }
                                  >
                                    <div className="proposal-buttons-div">
                                      <p className="button-text">
                                        Continue to Samhita DAO
                                      </p>
                                    </div>
                                  </button>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Grid>
                      ) : (
                        ""
                      )}
                      {/* Other joined DAOs */}
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <div className="all-datadao-section2">
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                          <Grid container item spacing={3}>
                            <React.Fragment>
                              {allDataDaos.length > 0
                                ? allDataDaos.map((dao, i) => (
                                    <Grid item xs={4} key={i}>
                                      <div className="proposal-details">
                                        <table>
                                          <thead>
                                            <tr>
                                              <th colSpan={2}>{dao.daoName}</th>
                                            </tr>
                                          </thead>
                                          <tr>
                                            <td>
                                              <p className="proposal-header">
                                                {dao.daoDescription}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="proposal-buttons">
                                              <button
                                                onClick={() =>
                                                  openDaoPage(
                                                    dao,
                                                    dao.daoAddress
                                                  )
                                                }
                                              >
                                                <div className="proposal-buttons-div">
                                                  <p className="button-text">
                                                    Continue to {dao.daoName}
                                                  </p>
                                                </div>
                                              </button>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </Grid>
                                  ))
                                : ""}
                            </React.Fragment>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    {/* Your Assets Content */}
                    {/* <YourAssetsContent /> */}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourDaos;
