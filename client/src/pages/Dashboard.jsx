import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const token = document.cookie
  //     .split(";")
  //     .find((c) => c.startsWith("token="));
  //   if (token) {
  //     try {
  //       const decoded = jwt.verify(token.split("=")[1], process.env.JWT_SECRET);

  //       setIsAdmin(decoded.type === "admin");
  //     } catch (err) {
  //       console.error("Error decoding token:", err);
  //     }
  //   }

  // }, []);

  if (!isAdmin) {
    return navigate("/adminlogin");
  }

  return <div>Admin Dashboard, username:</div>;
}

export default Dashboard;
