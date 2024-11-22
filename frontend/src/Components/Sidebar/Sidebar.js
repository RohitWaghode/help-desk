import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Tickets</h3>
      <button className="new-ticket">+ New ticket</button>
      <ul className="menu">
        <li>All tickets</li>
        <li>Active</li>
        <li>Pending</li>
        <li>Closed</li>
        <h3>Notes</h3>
        <li>All Notes</li>
        <h3>Users</h3>
        <li>All Users</li>
        <h3>Operators</h3>
        <li>All Operators</li>
      </ul>
    </div>
  );
};

export default Sidebar;
