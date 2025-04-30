import React, { useState } from "react";

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
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "40%",
        padding: 20,
        backgroundColor: "white",
        border: "1px solid gray",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
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
      <button onClick={onClose} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
};

export default TransactionPopup;
