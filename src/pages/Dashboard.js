// import React, { useState, useRef, useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../styles/SelectTemplate.scss";
// import { Button, CardActions } from "@mui/material";
// import img from "../assets/section3.jpg";
// // import TemplateDetails from "./TemplateDetails";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/Dashboard.scss";
// import YourDaos from "../components/YourDaos";
// import AvailabelProposal from "../components/AvailabelProposal";
// // import AllDataDaos from "../components/AllDataDaos";
// import Template from "../components/Template";
// import DataDaoDetails from "../components/DataDaoDetails";
// import YourDataDaoDetails from "../components/YourDataDaoDetails";
// import image1 from "../assets/image1.jpg";
// import image2 from "../assets/image2.jpg";
// import image3 from "../assets/image3.jpg";
// import { Box, Modal } from "@mui/material";
// import uploadfile from "../assets/upload.png";
// import { Web3Storage } from "web3.storage";
// import Dash1 from "../assets/Dash1.svg";

// function Dashboard() {
//   const client = new Web3Storage({
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxNjc0MzQ1NzIwMzU1NjFGMTFkNTM0ODk1OTQyNTJCNjUxOTgxNjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE0NDk3OTY0MTcsIm5hbWUiOiJTYW1oaXRhREFPIn0.EdesCPnTd8cF8Z3pdC45kKrmVZqPGEzTq3RdpHI1Vh0",
//   });

//   const location = useLocation();
//   console.log(location.state.data);
//   const [dashboard, setDashboard] = useState(true);
//   const [proposals, setProposals] = useState(false);
//   const [yourDaos, setYourDaos] = useState(false);
//   const [datadaos, setDatadaos] = useState(false);
//   const [userAmount, setUserAmount] = useState();
//   const [cid, setCid] = useState();
//   console.log(location.state);

//   const dashboardLinks = (a) => {
//     if (a === "Dashboard") {
//       setDashboard(true);
//       setProposals(false);
//       setYourDaos(false);
//       setDatadaos(false);
//     }
//     if (a === "Proposals") {
//       setDashboard(false);
//       setProposals(true);
//       setYourDaos(false);
//       setDatadaos(false);
//     } else if (a === "YourDaos") {
//       setDashboard(false);
//       setProposals(false);
//       setYourDaos(true);
//       setDatadaos(false);
//     } else if (a === "DataDAOs") {
//       setDashboard(false);
//       setProposals(false);
//       setYourDaos(false);
//       setDatadaos(true);
//     }
//   };

//   function hexToTimestamp(hex) {
//     const unixTimestamp = parseInt(hex, 16);
//     const date = new Date(unixTimestamp * 1000);
//     const localDate = date.toLocaleString("en-US");
//     return localDate;
//   }

//   const [data, setData] = useState([
//     {
//       cover: image1,
//       title: "Proposals",
//       link: "Proposals",
//       info: "Check all the Active Proposals and contribute to your Language Dao ! ",
//     },
//     {
//       cover: image2,
//       title: "Your Daos",
//       link: "YourDaos",
//       info: "Check all the language daos that you have created and contribute in it to build your community !",
//     },
//     {
//       cover: image3,
//       title: "Language DAOs",
//       link: "DataDAOs",
//       info: "Check all the language daos available in the platform and be part of one you like the most !",
//     },
//   ]);

//   {
//     const inputRef = useRef();
//     const inputRefEnd = useRef();
//     const fileInputRef = useRef();
//     const navigate = useNavigate();
//     const [showCreateProposal, setCreateProposal] = useState(false);
//     const handleOpen2 = () => setCreateProposal(true);
//     const handleClose2 = () => setCreateProposal(false);

//     const style = {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 900,

//       boxShadow: 24,
//       p: 4,
//     };

//     const upload = async () => {
//       const fileInput = document.querySelector("#fimg");
//       console.log(fileInput.files[0]);
//       const CID = await client.put(fileInput.files);
//       // console.log(CID);
//       const fileCid =
//         "https://" + CID + ".ipfs.w3s.link/" + fileInput.files[0].name;
//       console.log(fileCid);
//       setCid(fileCid);
//     };

//     return (
//       <div className="dashboard-main">
//         <div className="dashboard-bg"></div>
//         {/* <img className="dashboard-vector" src={Vector4} alt="Vector 4" /> */}
//         <div className="left-db">
//           <ul>
//             <li
//               className={dashboard ? "active" : ""}
//               onClick={() => {
//                 dashboardLinks("Dashboard");
//               }}
//             >
//               <svg
//                 className="dash-svg"
//                 xmlns="http://www.w3.org/2000/svg"
//                 enable-background="new 0 0 24 24"
//                 height="24px"
//                 viewBox="0 0 24 24"
//                 width="24px"
//                 fill="#000000"
//               >
//                 <g>
//                   <rect fill="none" height="24" width="24" />
//                 </g>
//                 <g>
//                   <g>
//                     <path d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z" />
//                     <path d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z" />
//                     <path d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z" />
//                     <path d="M15,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v4C13,20.1,13.9,21,15,21z" />
//                   </g>
//                 </g>
//               </svg>
//               Dashboard
//             </li>
//             <li
//               className={proposals ? "active" : ""}
//               onClick={() => {
//                 dashboardLinks("Proposals");
//               }}
//             >
//               <svg
//                 className="dash-svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1.33333 13.3333H9.33333C10.0667 13.3333 10.6667 12.7333 10.6667 12V1.33333C10.6667 0.6 10.0667 0 9.33333 0H1.33333C0.6 0 0 0.6 0 1.33333V12C0 12.7333 0.6 13.3333 1.33333 13.3333ZM1.33333 24H9.33333C10.0667 24 10.6667 23.4 10.6667 22.6667V17.3333C10.6667 16.6 10.0667 16 9.33333 16H1.33333C0.6 16 0 16.6 0 17.3333V22.6667C0 23.4 0.6 24 1.33333 24ZM14.6667 24H22.6667C23.4 24 24 23.4 24 22.6667V12C24 11.2667 23.4 10.6667 22.6667 10.6667H14.6667C13.9333 10.6667 13.3333 11.2667 13.3333 12V22.6667C13.3333 23.4 13.9333 24 14.6667 24ZM13.3333 1.33333V6.66667C13.3333 7.4 13.9333 8 14.6667 8H22.6667C23.4 8 24 7.4 24 6.66667V1.33333C24 0.6 23.4 0 22.6667 0H14.6667C13.9333 0 13.3333 0.6 13.3333 1.33333Z"
//                   fill="white"
//                 />
//               </svg>
//               Proposals
//             </li>
//             <li
//               className={yourDaos ? "active" : ""}
//               onClick={() => {
//                 dashboardLinks("YourDaos");
//               }}
//             >
//               <svg
//                 className="dash-svg"
//                 width="24"
//                 height="19"
//                 viewBox="0 0 24 19"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.5 0H1.5C1.10218 0 0.720644 0.166815 0.43934 0.463748C0.158035 0.76068 0 1.16341 0 1.58333V17.4167C0 17.8366 0.158035 18.2393 0.43934 18.5363C0.720644 18.8332 1.10218 19 1.5 19H22.5C22.8978 19 23.2794 18.8332 23.5607 18.5363C23.842 18.2393 24 17.8366 24 17.4167V1.58333C24 1.16341 23.842 0.76068 23.5607 0.463748C23.2794 0.166815 22.8978 0 22.5 0ZM12.75 12.6667H5.25C5.05109 12.6667 4.86032 12.5833 4.71967 12.4348C4.57902 12.2863 4.5 12.085 4.5 11.875C4.5 11.665 4.57902 11.4637 4.71967 11.3152C4.86032 11.1667 5.05109 11.0833 5.25 11.0833H12.75C12.9489 11.0833 13.1397 11.1667 13.2803 11.3152C13.421 11.4637 13.5 11.665 13.5 11.875C13.5 12.085 13.421 12.2863 13.2803 12.4348C13.1397 12.5833 12.9489 12.6667 12.75 12.6667ZM18.75 9.5H5.25C5.05109 9.5 4.86032 9.41659 4.71967 9.26813C4.57902 9.11966 4.5 8.9183 4.5 8.70833C4.5 8.49837 4.57902 8.29701 4.71967 8.14854C4.86032 8.00007 5.05109 7.91667 5.25 7.91667H18.75C18.9489 7.91667 19.1397 8.00007 19.2803 8.14854C19.421 8.29701 19.5 8.49837 19.5 8.70833C19.5 8.9183 19.421 9.11966 19.2803 9.26813C19.1397 9.41659 18.9489 9.5 18.75 9.5ZM18.75 6.33333H5.25C5.05109 6.33333 4.86032 6.24993 4.71967 6.10146C4.57902 5.95299 4.5 5.75163 4.5 5.54167C4.5 5.3317 4.57902 5.13034 4.71967 4.98187C4.86032 4.83341 5.05109 4.75 5.25 4.75H18.75C18.9489 4.75 19.1397 4.83341 19.2803 4.98187C19.421 5.13034 19.5 5.3317 19.5 5.54167C19.5 5.75163 19.421 5.95299 19.2803 6.10146C19.1397 6.24993 18.9489 6.33333 18.75 6.33333Z"
//                   fill="#F8F8F8"
//                 />
//               </svg>
//               Dao Details
//             </li>
//             <li
//               className={datadaos ? "active" : ""}
//               onClick={() => {
//                 dashboardLinks("DataDAOs");
//               }}
//             >
//               <img className="dash-svg" src={Dash1} alt="Dash" />
//               Template
//             </li>
//           </ul>
//         </div>
//         <div className="right-db">
//           {dashboard ? (
//             <>
//               <div className="select-main" id="right-db-inside">
//                 <h1 className="select-header">Manage Your DataDAO</h1>
//                 <p className="select-para">
//                   Click on any datadao to open dashboard for that dao.
//                 </p>
//                 <div className="templates-div">
//                   {data.map((item, key) => {
//                     return (
//                       <Card
//                         sx={{
//                           width: "100%",
//                           maxWidth: 400,
//                         }}
//                         key={key}
//                         className="card"
//                       >
//                         <CardActionArea
//                           onClick={() => {
//                             dashboardLinks(`${item.link}`);
//                           }}
//                         >
//                           <CardMedia
//                             component="img"
//                             height="180"
//                             image={item.cover}
//                             alt="green iguana"
//                           />
//                           <CardContent sx={{}}>
//                             <Typography
//                               gutterBottom
//                               variant="h5"
//                               component="div"
//                               sx={{ textAlign: "center", color: "#fff" }}
//                             >
//                               {item.title}
//                             </Typography>
//                             <Typography
//                               variant="body2"
//                               color="text.secondary"
//                               className="template-info"
//                               sx={{ textAlign: "center", color: "#fff" }}
//                             >
//                               {item.info}
//                             </Typography>
//                           </CardContent>
//                         </CardActionArea>
//                       </Card>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           ) : yourDaos ? (
//             <div className="datadao-details-main-div">
//               <div className="datadao-details-div">
//                 <div className="datadao-details-section1">
//                   <div className="button-flex">
//                     <h1 className="datadao-details-title padding-div">
//                       {/* {dataDaoInfo.dataDaoName} */}
//                       data dao name
//                     </h1>
//                   </div>
//                   <p className="datadao-details-desc padding-div width-peragraph">
//                     {/* {dataDaoInfo.dataDaoDescription} */}
//                     data dao des
//                   </p>
//                   <div className="dao-details-flext">
//                     <table className="dao-details-table">
//                       <tbody>
//                         <tr>
//                           <td id="top1">Token Name</td>
//                           <td
//                             id=""
//                             className="text-center"
//                             style={{ borderBottom: "1px solid #ff5731" }}
//                           >
//                             Token Address
//                           </td>
//                           <td id="top2">No of Tokens</td>
//                         </tr>
//                       </tbody>
//                       <tbody>
//                         <tr>
//                           <td id="bottom1">
//                             token name
//                             {/* {name} */}
//                           </td>
//                           <td id="">
//                             {/* {isSamhita
//                               ? samhitaTokenAddress
//                               : dataDaoInfo.dataDAOTokenAddress} */}
//                           </td>
//                           <td id="bottom2">
//                             <input
//                               type="Number"
//                               onChange={(e) => {
//                                 setUserAmount(e.target.value);
//                               }}
//                               className="enter-value "
//                               placeholder="Enter the Value"
//                             />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="datadao-details-button">
//                     <button
//                       className="create-proposal-btn"
//                       // onClick={() => buyToken()}
//                       // onClick={() => navigate("/open-existing-data-dao/meet")}
//                     >
//                       Buy Token
//                     </button>
//                     <button
//                       className="create-proposal-btn"
//                       onClick={handleOpen2}
//                     >
//                       Create Proposal
//                     </button>
//                   </div>
//                 </div>

//                 <div className="datadao-details-section2">
//                   <h1 className="datadao-details-dataset">
//                     {/* {isSamhita ? "Available Templates" : "Available Dataset"} */}
//                   </h1>
//                   <div className="dataset-main-flex">
//                     <table className="dataset-main-table">
//                       <thead>
//                         <tr>
//                           <div className="daodetails-proposal-name">
//                             <th colSpan={2}>{item.proposalName}</th>
//                           </div>
//                         </tr>
//                       </thead>
//                       <div className="padding-div">
//                         <tr>
//                           <td>
//                             <p className=" width-peragraph">
//                               {item.proposalDescription}
//                             </p>
//                           </td>
//                           <td className="datadao-width-btn">
//                             {" "}
//                             {/* <div className=" ">
//                                   <button className="datadao-details-extra-btn">
//                                     Update
//                                   </button>
//                                 </div> */}
//                           </td>
//                         </tr>
//                         <tr className="proposal-details-content">
//                           <label>Creator:</label>
//                           <td>
//                             {" "}
//                             <span className=" my-auto">
//                               {item.proposalCreator.substring(0, 6) +
//                                 "..." +
//                                 item.proposalCreator.substring(
//                                   item.proposalCreator.length - 5,
//                                   item.proposalCreator.length
//                                 )}
//                             </span>
//                             <svg
//                               width="16"
//                               height="18"
//                               viewBox="0 0 16 18"
//                               fill=""
//                               xmlns="http://www.w3.org/2000/svg"
//                               style={{
//                                 margin: " 0 20px",
//                                 cursor: "pointer",
//                               }}
//                               // onClick={() =>
//                               //   copyContent(item.proposalCreator)
//                               // }
//                             >
//                               <path
//                                 d="M10.7 0.666748H7.455C5.985 0.666748 4.82 0.666748 3.90917 0.790081C2.97083 0.916748 2.21167 1.18341 1.61333 1.78425C1.01417 2.38508 0.748333 3.14758 0.6225 4.08925C0.5 5.00425 0.5 6.17341 0.5 7.64925V12.5142C0.5 13.7709 1.26667 14.8476 2.35583 15.2992C2.3 14.5409 2.3 13.4784 2.3 12.5934V8.41841C2.3 7.35091 2.3 6.43008 2.39833 5.69341C2.50417 4.90341 2.7425 4.14675 3.35417 3.53258C3.96583 2.91841 4.72 2.67925 5.50667 2.57258C6.24 2.47425 7.15667 2.47425 8.22083 2.47425H10.7792C11.8425 2.47425 12.7575 2.47425 13.4917 2.57258C13.2717 2.01123 12.8877 1.52916 12.3897 1.18921C11.8917 0.849264 11.3029 0.6672 10.7 0.666748Z"
//                                 fill="#F8F8F8"
//                               />
//                               <path
//                                 d="M3.5 8.49763C3.5 6.22597 3.5 5.09013 4.20333 4.3843C4.90583 3.67847 6.03667 3.67847 8.3 3.67847H10.7C12.9625 3.67847 14.0942 3.67847 14.7975 4.3843C15.5 5.09013 15.5 6.22597 15.5 8.49763V12.5143C15.5 14.786 15.5 15.9218 14.7975 16.6276C14.0942 17.3335 12.9625 17.3335 10.7 17.3335H8.3C6.0375 17.3335 4.90583 17.3335 4.20333 16.6276C3.5 15.9218 3.5 14.786 3.5 12.5143V8.49763Z"
//                                 fill="#F8F8F8"
//                               />
//                             </svg>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             {" "}
//                             <h4 className=" width-peragraph">
//                               uploaded file :
//                               {/* <a
//                                     href={
//                                       // isSamhita
//                                       //   ? item.proposalFile
//                                         // : item.proposalIamge
//                                     }
//                                     target="_blank"
//                                   >
//                                     {isSamhita
//                                       ? item.proposalFile
//                                       : item.proposalIamge}
//                                   </a> */}
//                             </h4>
//                           </td>
//                           <td>
//                             {/* <div className=" datadao-details-btn-padding">
//                                   <button className="datadao-details-extra-btn">
//                                     Put on Sell
//                                   </button>
//                                 </div> */}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <h4 className="width-peragraph">
//                               Proposed At: &nbsp; date/time
//                               {/* {hexToTimestamp(item.proposedAt._hex)} */}
//                             </h4>
//                           </td>
//                           <td></td>
//                         </tr>
//                       </div>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//               <Modal
//                 open={showCreateProposal}
//                 onClose={handleClose2}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//               >
//                 <Box sx={style} className="create-proposal-parent-div">
//                   <div className="create-proposal-main-div">
//                     <div>
//                       <h1 className="create-proposal-title">New Proposal</h1>
//                       <p className="create-proposal-desc">
//                         Enter the details of a new proposal and submit them.
//                       </p>

//                       <div className="create-proposal-div">
//                         <label className="create-proposal-label">Title</label>
//                         <div className="textfields-width">
//                           <input
//                             type="text"
//                             onChange={(e) =>
//                               setProposalInfo({
//                                 ...proposalInfo,
//                                 Name: e.target.value,
//                               })
//                             }
//                           />{" "}
//                         </div>
//                         <label className="create-proposal-label">
//                           Description
//                         </label>
//                         <div className="textfields-width">
//                           <textarea
//                             rows="70"
//                             type="text"
//                             className="desc-height"
//                             onChange={(e) =>
//                               setProposalInfo({
//                                 ...proposalInfo,
//                                 Description: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         {/* <label className="create-proposal-label">
//                           Language
//                         </label>
//                         <div className="textfields-width">
//                           <input
//                             type="text"
//                             onChange={(e) =>
//                               setProposalInfo({
//                                 ...proposalInfo,
//                                 Lang: e.target.value,
//                               })
//                             }
//                           />
//                         </div> */}
//                         {isSamhita ? (
//                           <>
//                             <label className="create-proposal-label">
//                               Category
//                             </label>
//                             <div className="textfields-width">
//                               <select
//                                 className="temp-select"
//                                 onChange={(e) =>
//                                   setProposalInfo({
//                                     ...proposalInfo,
//                                     SamhitaCatagory: e.target.value,
//                                   })
//                                 }
//                               >
//                                 <option
//                                   className="temp-options"
//                                   value="template"
//                                 >
//                                   Select an Option
//                                 </option>
//                                 <option
//                                   className="temp-options"
//                                   value="template"
//                                 >
//                                   Template
//                                 </option>
//                                 <option
//                                   className="temp-options"
//                                   value="governance"
//                                 >
//                                   Governance
//                                 </option>
//                                 <option
//                                   className="temp-options"
//                                   value="finance"
//                                 >
//                                   Finance
//                                 </option>
//                               </select>
//                             </div>{" "}
//                           </>
//                         ) : (
//                           <>
//                             <label className="create-proposal-label">
//                               Template ID
//                             </label>
//                             <div className="textfields-width">
//                               <select>
//                                 {/* <select
//                                 className="temp-select"
//                                 // onChange={
//                                 //   (e) => {
//                                 //     console.log(e.target.value);
//                                 //     setProposalInfo
//                                 //     // ({
//                                 //       ...proposalInfo,
//                                 //       LangTemID: e.target.value,
//                                 //     });
//                                 //   }
//                                   // setProposalInfo({
//                                   //   ...proposalInfo,
//                                   //   LangTemID: e.target.value,
//                                   // })
//                                 // }
//                               > */}
//                                 <option className="temp-options" value="">
//                                   Select templte
//                                 </option>
//                                 {/* {dropdownData.map((items) => { */}
//                                 return (
//                                 <option
//                                   className="temp-options"
//                                   value={parseInt(items.proposalID, 16)}
//                                 >
//                                   {items.proposalName}
//                                 </option>
//                                 ); })}
//                                 {/* <option
//                                   className="temp-options"
//                                   value="templateid"
//                                 >
//                                   TemplateID
//                                 </option> */}
//                               </select>
//                             </div>{" "}
//                           </>
//                         )}
//                         <label className="create-proposal-label">
//                           Upload File
//                         </label>
//                         <div
//                           className="proposal-margin-div"
//                           onClick={() => fileInputRef.current.click()}
//                         >
//                           <img src={uploadfile} alt="upload" />
//                           <input
//                             type="file"
//                             id="fimg"
//                             hidden
//                             ref={fileInputRef}
//                             // onChange={(e) => deployEncrypted(e)}
//                             onChange={() => upload()}
//                           />
//                         </div>
//                         {/* <label className="create-proposal-label">
//                           Proposal Date
//                         </label>
//                         <div className="start-end-div">
//                           <input
//                             type="text"
//                             className="proposal-date"
//                             placeholder="Start-Date"
//                             ref={inputRef}
//                             onChange={(e) =>
//                               setProposalInfo({
//                                 ...proposalInfo,
//                                 startDate: e.target.value,
//                               })
//                             }
//                             onFocus={() => (inputRef.current.type = "date")}
//                             onBlur={() => (inputRef.current.type = "text")}
//                           />
//                           <input
//                             type="text"
//                             className="proposal-date  proposal-date1"
//                             placeholder="End-Date"
//                             ref={inputRefEnd}
//                             onChange={(e) =>
//                               setProposalInfo({
//                                 ...proposalInfo,
//                                 endDate: e.target.value,
//                               })
//                             }
//                             onFocus={() => (inputRefEnd.current.type = "date")}
//                             onBlur={() => (inputRefEnd.current.type = "text")}
//                           />
//                         </div> */}
//                         <div className="uploadfile textfields-width">
//                           <button
//                             className="create-proposal-btn-popup"
//                             // onClick={() => createProposal()}
//                           >
//                             Create Proposal
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Box>
//               </Modal>
//             </div>
//           ) : proposals ? (
//             <>
//               {" "}
//               {/* {console.log(isSamhita)} */}
//               <AvailabelProposal
//               // daoAddress={daoAddress}
//               // isSamhita={isSamhita}
//               />
//             </>
//           ) : datadaos ? (
//             <Template />
//           ) : singleDataDao ? (
//             <DataDaoDetails
//               datadaos={datadaos}
//               setDatadaos={setDatadaos}
//               setSingleDataDao={setSingleDataDao}
//               setYourDaos={setYourDaos}
//               yourDaos={yourDaos}
//               // daoAddress={daoAddress}
//             />
//           ) : singleYourDataDao ? (
//             <YourDataDaoDetails
//               datadaos={datadaos}
//               setDatadaos={setDatadaos}
//               // setSingleYourDataDao={setSingleYourDataDao}
//               setYourDaos={setYourDaos}
//               yourDaos={yourDaos}
//               // daoAddress={daoAddress}
//             />
//           ) : null}
//           <ToastContainer
//             position="bottom-right"
//             autoClose={2000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default Dashboard;
