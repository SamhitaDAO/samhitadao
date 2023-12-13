import React, { useState } from "react";
import topCurvedLinesDAO from "../../assets/yourDaos/top-curved-lines-your-dao.svg";
import "../../styles/datapatternpages/datacraft.css";
import { Blob, Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import Createproposalpopup from "../Dashboard/Createproposalpopup";

const handlesubmitdatacraft = async () => {
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
      if (chainId === 199) {
        const contract = new ethers.Contract(
          // samhitacontract,
          // SamhitaABI.abi,
          signer
        );
      } else {
        alert("Please connect to the BitTorrent Chain Mainnet!");
      }
    }
  } catch (error) {
    console.log(error);
    alert(error["message"]);
    // settxloading(false);
  }
};

function Datacraft() {
  const [data, setData] = useState([]);
  const [generatedCID, setGeneratedCID] = useState("");
  const [ccidlink, setccidlink] = useState("");

  const handlePopupClose = () => {
    // This can include changing the state to hide the popup or any other appropriate action
  };

  const handleFinalccidChange = (cid) => {
    setccidlink(cid);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const lines = content.split("\n");
    const data = lines.map((line) => line.split(","));

    const maxColumns = Math.max(...data.map((row) => row.length));
    const filledData = data.map((row) =>
      row.concat(Array(maxColumns - row.length).fill(""))
    );

    setData(filledData);
  };
  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = value;
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = Array(data[0]?.length || 0).fill("");
    setData([...data, newRow]);
  };

  const handleAddColumn = () => {
    const newData = data.map((row) => [...row, ""]);
    setData(newData);
  };

  const handleSubmit = async () => {
    const contentToUpload = data.map((row) => row.join(",")).join("\n");
    const contentBlob = new Blob([contentToUpload], { type: "text/csv" });
    const files = [new File([contentBlob], "data.json")];
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRhNDBCNzA3QUU5NTZCQTg2NzQyNzdjNWRBRDE2NGZkZWNlQTVBNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTE1NTA4Nzk3NDIsIm5hbWUiOiJTYW1oaXRhIERBTyJ9.g9MjrjLaYGOD1XRnu8_6MW-kYorhcGDGAsE2anTudjY",
    });

    try {
      const cidd = await client.put(files);
      const cid = `https://${cidd}.ipfs.w3s.link/data.json`;

      console.log("Uploaded Content CID:", cid);
      setccidlink(cid);
      setGeneratedCID(cid);
    } catch (error) {
      console.error("Error uploading content:", error);
    }
  };

  return (
    <div className="datacraft-container">
      <div className="maindaoBg">
        <div className="your-dao-bg-images">
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="Top Curve"
          />
          <div className="whole-div-of-data-craft">
            <div className="user-form-div-data-scrape ">
              <div className="data-craft-main-heading-title">DataCraft</div>
              <div className="form-input-data-craft">
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
          </div>
          <div className="main-div-for-data-craft">
            <div className="data-craft-heading-title">
              <div className="upload-your-file-button-data-craft">
                <button></button>
                <input onChange={handleFileUpload} type="file" accept=".csv" />
              </div>
              <div className="table-to-upload-the-data">
                {data.length > 0 && (
                  <div className="uploaded-data-container">
                    <div className="uploaded-data-table">
                      <table>
                        <tbody>
                          {data.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className={
                                rowIndex % 2 === 0 ? "even-row" : "odd-row"
                              }
                            >
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className={
                                    cellIndex === 0
                                      ? "first-element-row"
                                      : cellIndex === row.length - 1
                                      ? "last-element-row"
                                      : ""
                                  }
                                >
                                  <input
                                    className="each-cell-of-table"
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleCellChange(
                                        rowIndex,
                                        cellIndex,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="buttons-divs">
                <div className="add-row-column-button-div">
                  <button className="add-row-btn" onClick={handleAddRow}>
                    + Add Row
                  </button>
                  <button className="add-column-btn" onClick={handleAddColumn}>
                    + Add Column
                  </button>
                </div>
                <div className="submit-button-div">
                  <button className="submit-btn" onClick={handleSubmit}>
                    Get CID Link
                  </button>
                  {/* <Createproposalpopup
                    onClose={handlePopupClose}
                    generatedCID={generatedCID}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="div-div-div">
            <div className="div-to-submit-cid-and-data-scrape">
              <div className="input-form-div-datascrape">
                <label htmlFor="cidLink">CID Link</label>
                <br />
                <input
                  type="text"
                  id="cidLink"
                  name="cidLink"
                  value={ccidlink}
                  // value={cidLink}
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

export default Datacraft;
