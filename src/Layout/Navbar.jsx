import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (user) => {
  const [access, setAccess] = useState(null)
  const [data, setData] = useState([])
  useEffect(() => {
    const access = localStorage.getItem("access_token")
    setAccess(access)
    setData(user)
    }, [data]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  
  return (
    <div className="navbar">
      <h3>Электронный дневник</h3>
      <button onClick={logout}>Выйти</button>
    </div>
    
  );
};

export default Navbar;