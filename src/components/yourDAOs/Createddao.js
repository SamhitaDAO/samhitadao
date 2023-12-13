import React, { useState, useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import "../../styles/yourDAOS/createddao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Detailsofthedao from "../yourDAOs/Detailsofthedao";
import { useNavigate } from "react-router-dom";
import { languagedaofactory } from "../../ContractAddresses";
import languagedaofactoryABI from "../../Samhita Artifacts/languagedaofactory.json";
import { samhitacontract } from "../../ContractAddresses";
import languagedaoABI from "../../Samhita Artifacts/languagedao.json";
import samhitaABI from "../../Samhita Artifacts/samhita.json";
import { samhitatokencontract } from "../../ContractAddresses";
import samhitatoken from "../../Samhita Artifacts/samhitaToken.json";
import Loader from "../Loader"; // Import your loader component

function Createddao() {
  const [allDataDaos, setDataDaos] = useState([]);
  const [joinedDaos, setJoinedDaos] = useState([]);
  const { address, isConnected } = useAccount();
  const [isJoined, setIsJoined] = useState();
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [isSamhita, setIsSamhita] = useState();
  const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);

  const handleViewMoreClick = (dao) => {
    setSelectedDao(dao);
    navigate(`/go-to-main-dashboard/${dao.id}`);
  };

  const getAllDataDaos = async () => {
    // setLoading(true); // You can remove this line as it's already initialized as true
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
          const samhitaContract = new ethers.Contract(
            samhitacontract,
            samhitaABI.abi,
            signer
          );

          const contract = new ethers.Contract(
            languagedaofactory,
            languagedaofactoryABI.abi,
            signer
          );
          const dataDaos = await contract.getUserDataDaos(address);
          setDataDaos(dataDaos);

          const allDAOs = await contract.getAllDataDaos();
          console.log("allDAOS = ", allDAOs);

          for (let i = 0; i < allDAOs.length; i++) {
            const languageContract = new ethers.Contract(
              allDAOs[i].dataDaoAddress,
              languagedaoABI.abi,
              signer
            );
            const isMember = await languageContract.isMemberAdded(address);
            console.log("is member here = ", isMember);
            if (isMember) {
              joinedDaos.push(allDAOs[i]);
            }
          }
          setJoinedDaos(joinedDaos);
          console.log("joined daos here = ", joinedDaos);
          // Remove the setLoading line from here to properly handle loading
        } else {
          alert("Please connect to the BitTorrent Chain Mainnet!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    getAllDataDaos();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-container-of-the-create-dao">
          {allDataDaos.map((dao) => (
            <div key={dao.dataDaoAddress} className="card-of-the-joined-dao">
              <div className="card-headerof-the-joined-dao">
                <h2>{dao.dataDaoName}</h2>
              </div>
              <div className="card-body-of-the-joined-dao">
                <p>{dao.dataDaoDescription}</p>
              </div>
              <div className="card-footer-of-the-joined-dao">
                <div className="div-for-button-of-the-joined-dao">
                  {selectedDao &&
                  selectedDao.dataDaoAddress === dao.dataDaoAddress ? (
                    // Render the Detailsofthedao component when the button is clicked
                    <Detailsofthedao dao={selectedDao} />
                  ) : (
                    <button
                      className="view-more-button-of-the-create-dao"
                      onClick={() => handleViewMoreClick(dao)}
                    >
                      View More{" "}
                      <FontAwesomeIcon
                        className="right-side-icon-of-button-in-the-joined-dao-for-view-more"
                        icon={faArrowRight}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Createddao;
