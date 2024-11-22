import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab }) => {
  return (
    <div className="sidebar">
      <h3>{activeTab}</h3>
      <button className="new-ticket">+ New ticket</button>
    </div>
  );
};

export default Sidebar;
