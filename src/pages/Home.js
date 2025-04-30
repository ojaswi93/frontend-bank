import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome to the Banking System</h1>
      <button
        onClick={() => navigate("/login/customer")}
        style={{ margin: 10 }}
      >
        Customer Login
      </button>
      <button onClick={() => navigate("/login/banker")} style={{ margin: 10 }}>
        Banker Login
      </button>
    </div>
  );
};

export default Home;
