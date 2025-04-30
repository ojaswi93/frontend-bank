import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import your global styles

const BankerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    };

    fetchCustomers();
  }, [token]);

  return (
    <div className="container center">
      <h2>Banker Dashboard</h2>
      <h4>All Customers</h4>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>View Transactions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.email}</td>
              <td>
                <button
                  onClick={() => navigate(`/dashboard/banker/${cust.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankerDashboard;
