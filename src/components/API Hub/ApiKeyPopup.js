import React, { useState } from "react";
import "../../styles/apihub/apihubmainpage.css";

function Apikeypopup({ onClose }) {
  const [price, setPrice] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const handlePurchase = () => {
    // Handle the purchase logic here
    // You can send the price and timePeriod to the server or perform any other action
    // Once the purchase is successful, you can close the popup using onClose()
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="api-key-popup">
        <span className="close-icon-in-popup" onClick={onClose}>
          &#x2715;
        </span>

        <div className="checkout-title-popup">Checkout</div>
        <div className="api-key-form">
          <div className="popup-fields-in-generate-api-key">
            <label htmlFor="price">Price:</label>
            {/* <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            /> */}
          </div>
          <br />
          <div className="popup-fields-in-generate-api-key">
            <label htmlFor="timePeriod">Time Period: </label>
            {/* <input
              type="text"
              id="timePeriod"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            /> */}
          </div>
        </div>
        <div className="purchase-button-in-popup">
          <button className="purchase-popup-btn" onClick={handlePurchase}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apikeypopup;
