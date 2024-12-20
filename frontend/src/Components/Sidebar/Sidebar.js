import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setVisible, showAddTicket, onBack }) => {
  const navigation = useNavigate();
  const isUser = localStorage.getItem("user_type") === "User";
  const isAdmin = localStorage.getItem("user_type") === "Admin";

  return (
    <div className="sidebar">
      <h3 onClick={onBack ? () => navigation("/dashboard") : () => {}}>
        {activeTab}
      </h3>
      {isAdmin && (
        <h3 onClick={onBack ? () => navigation("/users") : () => {}}>
          Users list
        </h3>
      )}
      {isUser && showAddTicket && (
        <button className="new-ticket" onClick={() => setVisible(true)}>
          + New ticket
        </button>
      )}
    </div>
  );
};

export default Sidebar;
