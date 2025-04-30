import React, { useState } from "react";
import "../assets/styles.css"; // Import your global styles or use this locally

const TransactionPopup = ({ type, onClose, onSubmit, balance }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      alert("Enter valid amount");
      return;
    }
    if (type === "withdraw" && value > balance) {
      alert("Insufficient funds");
      return;
    }
    onSubmit(type, value);
  };

  return (
    <div className="popup">
      <h3>{type === "deposit" ? "Deposit" : "Withdraw"} Money</h3>
      <p>Available Balance: ${balance.toFixed(2)}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose} className="cancel-btn">
        Cancel
      </button>
    </div>
  );
};

export default TransactionPopup;
