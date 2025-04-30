import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerLogin from "./pages/CustomerLogin";
import BankerLogin from "./pages/BankerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import BankerDashboard from "./pages/BankerDashboard";
import CustomerTransactions from "./pages/CustomerTransactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/banker" element={<BankerLogin />} />
      <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      <Route path="/dashboard/banker" element={<BankerDashboard />} />
      <Route
        path="/dashboard/banker/:userId"
        element={<CustomerTransactions />}
      />
    </Routes>
  );
}

export default App;
