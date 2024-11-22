import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>DASHBOARD</h3>
      <button className="new-ticket">+ New ticket</button>
      <ul className="menu">
        <li>All tickets</li>
        <li>
          <Link to="/users">User List</Link>
        </li>
        <li>
          <Link to="/create/ticket">Create Ticket</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
