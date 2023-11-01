import React from "react";
import "../../styles/yourassetscontent.css";
// import imgggg from "../../assets/nft/oggy.jpg";
import hangul from "../../assets/nft/hangul.png";
import sanskrit from "../../assets/nft/sanskrit.jpeg";

const nftDatasets = [
  {
    id: 1,
    title: "Hangul",
    image: hangul,
    description:
      "The Korean alphabet, known as Hangul in South Korea,modern official writing system for the Korean language.",
  },
  {
    id: 2,
    title: "Sanskrit",
    image: sanskrit,
    description:
      "Sanskrit is a classical language belonging to the Indo-Aryan branch of the Indo-European languages.",
  },
  // Add more datasets as needed
];

export default function YourAssetsContent() {
  return (
    <div className="nft-container">
      {nftDatasets.map((nftData) => (
        <div key={nftData.id} className="nft-card">
          <div className="nft-title">{nftData.title}</div>
          <img className="nft-image" src={nftData.image} alt="NFT Image" />
          <div className="nft-description">{nftData.description}</div>
        </div>
      ))}
    </div>
  );
}
