import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader"; // Import your loader component
import Detailsofthedao from "../yourDAOs/Detailsofthedao";
import "../../styles/yourDAOS/joineddao.css";
import { ethers } from "ethers";

import SamhitaABI from "../../Samhita Artifacts/samhita.json";
import { samhitacontract } from "../../ContractAddresses";
import { languagedaofactory } from "../../ContractAddresses";
import langdaofactoryABI from "../../Samhita Artifacts/languagedaofactory.json";

function Joineddao() {
  const navigate = useNavigate();
  const [selectedDao, setSelectedDao] = useState(null);
  const [ismembersamhita, setismembersamhita] = useState(false);
  const [joinedDaos, setJoinedDaos] = useState([]);
  const [notCreatedLanguageDaos, setNotCreatedLanguageDaos] = useState([]);
  const [languageDaosInfo, setLanguageDaosInfo] = useState([]);
  const [isSamhita, setissamhita] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const gettingjoineddaos = async () => {
    setIsLoading(true);
    console.log("entered into getting all daos function");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const useraddress = signer.getAddress();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 199) {
          const contract = new ethers.Contract(
            languagedaofactory,
            langdaofactoryABI.abi,
            signer
          );
          const getalldaoss = await contract.getAllDataDaos();
          console.log(getalldaoss);
          console.log(getalldaoss[0].dataDaoName);

          const languageDaoAddresses = getalldaoss.map(
            (dao) => dao.dataDaoAddress
          );
          console.log("Language DAO Addresses: ", languageDaoAddresses);

          const getcreatedao = await contract.getUserDataDaos(useraddress);
          console.log("get created dao", getcreatedao);
          const getalluserdao = getcreatedao.map((dao) => dao.dataDaoAddress);
          console.log("user created dao address:", getalluserdao);

          const notCreatedLanguageDaos = languageDaoAddresses.filter(
            (address) => !getalluserdao.includes(address)
          );
          console.log(
            "Language DAO Addresses not created by the user: ",
            notCreatedLanguageDaos
          );

          const languageDaosInfo = [];
          for (const address of notCreatedLanguageDaos) {
            const matchingDao = getalldaoss.find(
              (dao) => dao.dataDaoAddress === address
            );
            if (matchingDao) {
              languageDaosInfo.push(matchingDao);
            }
          }
          console.log(
            "Language DAO Info for not created by the user: ",
            languageDaosInfo
          );
          setLanguageDaosInfo(languageDaosInfo);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    } finally {
      setIsLoading(false);
    }
  };

  const getsamhitajoined = async () => {
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
        console.log("switch case for this case is: " + chainId);
        if (chainId === 199) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const user = signer.getAddress();
          console.log(user);
          const hasjoined = await contract.isMemberAdded(user);
          console.log(hasjoined);
          setismembersamhita(hasjoined);
        } else {
          alert("Please connect to the BitTorrent Chain Mainnet!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    gettingjoineddaos();
    getsamhitajoined();
  }, []);

  const handleViewMoreClick = async (a, b) => {
    console.log("view more btn here");
    navigate("/go-to-main-dashboard", {
      state: { isSamhita: a, daoAddress: b },
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-div-of-the-joined-dao">
          <div className="card-of-the-joined-dao">
            <div className="card-headerof-the-joined-dao">
              <h2>Samhita DAO</h2>
            </div>
            <div className="card-body-of-the-joined-dao">
              <p>
                Samhita DAO was born from a deep sense of urgency to save
                endangered languages from disappearing into oblivion. Samhita
                DAO is empowering communities to create dictionaries, grammar
                guides, and oral histories that capture the essence of their
                language.
              </p>
            </div>
            <div className="card-footer-of-the-joined-dao">
              <div className="div-for-button-of-the-joined-dao">
                <button
                  className="view-button-of-the-joined-dao"
                  onClick={() => handleViewMoreClick(true, samhitacontract)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>

          <div className="another-div-for-language-daos-info">
            {languageDaosInfo.map((dao, i) => (
              <div key={dao.dataDaoAddress} className="card-of-the-joined-dao">
                <div className="card-headerof-the-joined-dao">
                  <h2>{dao.dataDaoName}</h2>
                </div>
                <div className="card-body-of-the-joined-dao">
                  <p>{dao.dataDaoDescription}</p>
                </div>
                <div className="card-footer-of-the-joined-dao">
                  <div className="div-for-button-of-the-joined-dao">
                    <button
                      className="view-button-of-the-joined-dao"
                      onClick={() =>
                        handleViewMoreClick(false, dao.dataDaoAddress)
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Joineddao;
