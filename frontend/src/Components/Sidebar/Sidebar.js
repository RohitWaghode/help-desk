import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setVisible, showAddTicket, onBack }) => {
  const navigation = useNavigate();
  return (
    <div className="sidebar">
      <h3 onClick={onBack ? () => navigation("/dashboard") : () => {}}>
        {activeTab}
      </h3>
      {showAddTicket && (
        <button className="new-ticket" onClick={() => setVisible(true)}>
          + New ticket
        </button>
      )}
    </div>
  );
};

export default Sidebar;
