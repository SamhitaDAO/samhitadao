import React from "react";
import { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/datapatternpages/datascrape.css";
import DifferentDataTemplates from "./DifferentDataTemplates";
import { ethers } from "ethers";

const handlesubmitdatascrape = async () => {
  console.log("entered datacraft");
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress());
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      const { chainId } = await provider.getNetwork();
      console.log("switch case for this case is: " + chainId);
      if (chainId === 1029) {
        const contract = new ethers.Contract(
          // samhitacontract,
          // SamhitaABI.abi,
          signer
        );
      } else {
        alert("Please connect to the BitTorrent Chain Donau!");
      }
    }
  } catch (error) {
    console.log(error);
    alert(error["message"]);
    // settxloading(false);
  }
};

function Datascrape() {
  const [cidLink, setCidLink] = useState(""); // State to store the finalcid

  // Function to update the cidLink state
  const handleFinalCidChange = (finalCid) => {
    setCidLink(finalCid);
  };
  return (
    <div>
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="outer-div-of-data-scrape-div">
            <div className="user-form-div-data-scrape">
              <p className="data-scrape-title-heading-i">Datascrape</p>
              <div className="all-inputs-of-data-scrape-form">
                <div className="input-form-div-datascrape">
                  <label htmlFor="title">Title</label> &nbsp;
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    // value={formData.title}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-form-div-datascrape">
                  <label htmlFor="title">Description</label> &nbsp;
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    // value={formData.title}
                    // onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* <div className="main-div-of-the-data-scape-i">heelo</div> */}
            <div className="main-div-of-the-data-scrape">
              <div className="div-for-all-title">
                {/* <p className="data-scrape-title-heading-ii">
                  Preserving Linguistic Heritage
                </p>
                <p className="data-scrape-title-heading-iii">
                  Empowering Future Generations
                </p> */}
              </div>
              <div className="div-for-the-input-form-data-scrape">
                <DifferentDataTemplates
                  onFinalCidChange={handleFinalCidChange}
                />
              </div>
            </div>
            <div className="div-to-submit-cid-and-data-scrape">
              <div className="input-form-div-datascrape">
                <label htmlFor="cidLink">CID Link</label>
                <br />
                <input
                  type="text"
                  id="cidLink"
                  name="cidLink"
                  value={cidLink}
                  // value={formData.cidLink}
                  // onChange={handleChange}
                  required
                />
              </div>
              <div className="submit-button-for-datascrape">
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datascrape;
