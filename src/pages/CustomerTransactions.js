import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const { userId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.get(`/admin/transactions/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    };

    fetchTransactions();
  }, [userId, token]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Customer Transactions (ID: {userId})</h2>
      <Link to="/dashboard/banker">← Back</Link>
      <table border="1" style={{ margin: "auto", marginTop: 20 }}>
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
    </div>
  );
};

export default CustomerTransactions;
