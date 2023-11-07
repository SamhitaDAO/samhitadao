import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import orangeCurvedLines from "../assets/landingPage/orange-curved-lines.svg";
import orangeSecondary from "../assets/landingPage/orange-secondary-curve.svg";
import yellowCircle from "../assets/landingPage/yellow-circle.png";
import purpleCircle from "../assets/landingPage/purple-circle.png";
import orangeCircle from "../assets/landingPage/orange-circle.svg";
import languageImage from "../assets/landingPage/language.svg";
import mainHeroBg from "../assets/landingPage/main-hero-bg.svg";
import AboutBecomeMember from "../components/aboutPlatform/AboutBecomeMember";
import { samhitatokencontract } from "../ContractAddresses";
import samhitatokenABI from "../Samhita Artifacts/samhitaToken.json";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const delegateusers = async () => {
    console.log("entering into delegateing user function");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();

        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitatokencontract,
            samhitatokenABI.abi,
            signer
          );

          const user = "0x64A56d847EA0518A7ed4C31eecF59a87c031A523";
          console.log("started delegating....");
          const userdelegating = await contract.delegate(user);
          console.log("completed delegating...");
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const openCreateDaoPage = () => {
    navigate("/select-template");
  };
  const openExistingDaoPage = () => {
    // navigate("/open-existing-data-dao");
    navigate("/pre-existing-data-dao");
  };
  const openYourdaos = () => {
    navigate("/main-page-your-daos");
  };

  return (
    <>
      <section className="hero-section">
        <div className="main-hero">
          <div className="hero-bg-images">
            <img
              src={mainHeroBg}
              className="main-hero-orange-bg"
              alt="mainbg"
            />
            <img
              src={orangeCurvedLines}
              className="orange-curved-lines"
              alt="orange-first"
            />
            <img
              src={orangeSecondary}
              className="orange-secondary"
              alt="orange-second"
            />
            <img
              src={yellowCircle}
              className="yellow-circle"
              alt="yellow-circle"
            />
            <img
              src={purpleCircle}
              className="purple-circle"
              alt="purple-circle"
            />
            <img
              src={orangeCircle}
              className="orange-circle"
              alt="orange-circle"
            />
          </div>
          <div className=" px-3 d-flex justify-content-center align-items-center">
            <div className="hero-text-image d-flex  align-items-center">
              <div className="hero-text  ">
                <p className="hero-text-head">
                  Welcome to <br /> SamhitaDAO
                </p>
                <p className="hero-sub-text">
                  We preserve the past for the <br />
                  future by reviving endangered languages.
                </p>
                <button
                  onClick={delegateusers}
                  className="rounded-button button-to-join"
                >
                  Delegate users
                </button>
                <button
                  className="rounded-button button-to-join"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="hero-button-text"> Join SamhitaDAO </span>
                  <span className="circle d-flex justify-content-center align-items-center ">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </button>
                {isOpen && (
                  <>
                    <div className="popup-overlay" />
                    <div ref={popupRef} className="popup">
                      <div className="language-header">Language DAO</div>
                      <div className="language-sub-header text-center">
                        If you’re new here, click on Existing Language Dao to
                        first join Samhita DAO
                      </div>
                      <div className="hero-btns">
                        <button
                          className="create-dao-btn"
                          onClick={() => openCreateDaoPage()}
                        >
                          Create Language Dao
                        </button>
                        <button
                          className="your-dao-btn"
                          onClick={() => openYourdaos()}
                        >
                          Your DAOs
                        </button>
                        <button
                          className="existing-dao-btn"
                          onClick={() => openExistingDaoPage()}
                        >
                          Existing Language Dao
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="language-image-div text-center">
                <img
                  src={languageImage}
                  className="language-image"
                  alt="LangImg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works-section">
        <AboutBecomeMember />
      </section>
    </>
  );
}

export default Home;
