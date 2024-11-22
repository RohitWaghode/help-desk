import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setVisible }) => {
  return (
    <div className="sidebar">
      <h3>{activeTab}</h3>
      <button className="new-ticket" onClick={() => setVisible(true)}>
        + New ticket
      </button>
    </div>
  );
};

export default Sidebar;
