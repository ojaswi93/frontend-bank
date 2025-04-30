import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please provide both email and password");
      return;
    }

    try {
      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the header is set
          },
        }
      );
      if (res.data.user.role === "customer") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        navigate("/dashboard/customer");
      } else {
        alert("Unauthorized");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Customer Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default CustomerLogin;
