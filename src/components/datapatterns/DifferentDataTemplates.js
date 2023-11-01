import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import "../../styles/datapatternpages/differentdatatemplates.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Createproposalpopup from "../Dashboard/Createproposalpopup";

const DifferentDataTemplates = ({ onFinalCidChange }) => {
  const [tableData, setTableData] = useState([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [generateCCID, setGeneratedCCID] = useState("");
  const [finalcid, setfinalcid] = useState("");

  const web3StorageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRhNDBCNzA3QUU5NTZCQTg2NzQyNzdjNWRBRDE2NGZkZWNlQTVBNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI5NDQxNTgxMzYsIm5hbWUiOiJmaWxlIn0.HwS6zXvz8_DY56l_3cDBxmvj-M9KAnSn6fm1minKlqY"; // Replace this with your actual token

  const web3StorageClient = new Web3Storage({ token: web3StorageToken });

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const addToTable = async () => {
    const imageDataURL = imageFile ? await readFileAsDataURL(imageFile) : null;
    const audioDataURL = audioFile ? await readFileAsDataURL(audioFile) : null;
    const videoDataURL = videoFile ? await readFileAsDataURL(videoFile) : null;

    const newRow = {
      text: text,
      image: imageDataURL,
      audio: audioDataURL,
      video: videoDataURL,
    };

    setTableData([...tableData, newRow]);
    addToPreviewData(); // Add data to the preview
    clearForm();
  };

  const addToPreviewData = async () => {
    const imageCID = imageFile
      ? await uploadFileToWeb3Storage(imageFile)
      : null;
    const audioCID = audioFile
      ? await uploadFileToWeb3Storage(audioFile)
      : null;
    const videoCID = videoFile
      ? await uploadFileToWeb3Storage(videoFile)
      : null;

    const newPreviewRow = {
      text: text,
      imageCID: imageCID,
      audioCID: audioCID,
      videoCID: videoCID,
    };

    const eachcid = JSON.stringify(newPreviewRow, null, 2); // Print the CIDs in JSON format
    console.log("eachcid = ", eachcid);
    setPreviewData([...previewData, newPreviewRow]);
    clearForm();
  };

  const uploadPreviewDataToWeb3Storage = async () => {
    const blob = new Blob([JSON.stringify(previewData, null, 2)], {
      type: "application/json",
    });

    const files = [new File([blob], "preview-data.json")];

    try {
      const cid = await web3StorageClient.put(files);
      const finalcid = `https://${cid}.ipfs.w3s.link/preview-data.json`;
      console.log("Whole link:", finalcid);
      setfinalcid(finalcid);
      onFinalCidChange(finalcid);
      // console.log(
      //   `Preview data uploaded to: https://${cid}.ipfs.w3s.link/preview-data.json`
      // );
      setGeneratedCCID(cid);
    } catch (error) {
      console.error("Error uploading preview data to web3.storage:", error);
    }
  };
  const uploadFileToWeb3Storage = async (file) => {
    try {
      const cid = await web3StorageClient.put([file]);
      const fileName = file.name;
      return `https://${cid}.ipfs.w3s.link/${fileName}`;
    } catch (error) {
      console.error("Error uploading file to web3.storage:", error);
      return null;
    }
  };

  const createTable = () => {
    if (tableData.length === 0) {
      return <p>No data to display.</p>;
    }

    const headers = Object.keys(tableData[0]);

    return (
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>
                  {header === "image" && rowData[header] ? (
                    <img src={rowData[header]} alt="" />
                  ) : header === "audio" && rowData[header] ? (
                    <audio controls src={rowData[header]} />
                  ) : header === "video" && rowData[header] ? (
                    <video
                      controls
                      src={rowData[header]}
                      className="video-player"
                    />
                  ) : (
                    <div>{rowData[header]}</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // const updateData = (rowIndex, header, value) => {
  //   const updatedData = [...tableData];
  //   updatedData[rowIndex][header] = value;
  //   setTableData(updatedData);
  // };

  const clearForm = () => {
    setText("");
    setImageFile(null);
    setAudioFile(null);
    setVideoFile(null);
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const PreviewPopup = () => {
    return (
      <div className="popup">
        <div className="popup-header">
          <div className="glimpse-of-data-title">Glimpse of Your Data</div>
          <button className="close-icon" onClick={togglePreview}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="border-radius-th">Text</th>
              <th>Image</th>
              <th>Audio</th>
              <th className="border-radius-right">Video</th>
            </tr>
          </thead>
          <tbody>
            {previewData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowData.text}</td>
                <td>
                  {rowData.imageCID && (
                    <img src={rowData.imageCID} alt="not found" />
                  )}
                </td>
                <td>
                  {rowData.audioCID && (
                    <audio controls src={rowData.audioCID} />
                  )}
                </td>
                <td>
                  {rowData.videoCID && (
                    <video
                      controls
                      src={rowData.videoCID}
                      className="video-player"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="div-for-submit-button-in-popup">
          <button
            className="table-submit-btn"
            onClick={uploadPreviewDataToWeb3Storage}
          >
            Upload
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* <h1>Upload Data and Edit</h1> */}
      <form
        id="dataForm"
        encType="multipart/form-data"
        className="form-to-submit-all-data"
      >
        <div className="text-image-div-combine">
          <div className="text-input-field">
            <label htmlFor="text">Text:</label>
            <textarea
              // value="your name"
              id="text"
              rows="1"
              cols="10"
              placeholder="Enter Text"
              className="editable-text-area"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="image-input-field">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="audio-video-div-combine">
          <div className="audio-input-field">
            <label htmlFor="audio">Audio:</label>
            <input
              type="file"
              id="audio"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </div>
          <div className="video-input-field">
            <label htmlFor="video">Video:</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="all-button-div">
          <input type="button" value="+Add to Table" onClick={addToTable} />
          <input type="button" value="Preview" onClick={togglePreview} />{" "}
        </div>
        {/* <div>{setfinalcid && <p>{finalcid}</p>}</div> */}
      </form>
      {isPreviewVisible && <PreviewPopup />}{" "}
      {/* <div className="div-for-the-input-form-data-scrape">
        <DifferentDataTemplates onFinalCidChange={handleFinalCidChange} />
      </div> */}
      {/* <Createproposalpopup generateCCID={generateCCID} /> */}
    </div>
  );
};

export default DifferentDataTemplates;
