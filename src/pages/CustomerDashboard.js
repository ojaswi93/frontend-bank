import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionPopup from "../components/TransactionPopup";
import "../assets/styles.css"; // Import your global styles
import api from "../api/axios";

const CustomerDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [popupType, setPopupType] = useState(null);
  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await api.get("/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTransactions(res.data);
    const total = res.data.reduce((acc, txn) => {
      return txn.type === "deposit"
        ? acc + Number(txn.amount)
        : acc - Number(txn.amount);
    }, 0);
    setBalance(total);
  };

  const handleTransaction = async (type, amount) => {
    try {
      const res = await api.post(
        `/transactions/${type}`,
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      setPopupType(null);
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container center">
      <h2>Customer Dashboard</h2>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <button onClick={() => setPopupType("deposit")}>Deposit</button>
      <button onClick={() => setPopupType("withdraw")}>Withdraw</button>

      <h4>Transaction History</h4>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.type}</td>
              <td>${txn.amount}</td>
              <td>{new Date(txn.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupType && (
        <TransactionPopup
          type={popupType}
          onClose={() => setPopupType(null)}
          onSubmit={handleTransaction}
          balance={balance}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
