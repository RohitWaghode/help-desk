import React from "react";
import "./Tickets.css";

const Tickets = () => {
  const tickets = [
    {
      user: "rohit",
      notes: "issue in login",
      status: "pending",
      updated: "now",
    },
    {
      user: "jay",
      notes: "issue in login",
      status: "open",
      updated: "now",
    },
    {
      user: "kunal",
      notes: "issue in login",
      status: "closed",
      updated: "now",
    },
  ];
  return (
    <div className="ticket-table">
      <h3>All Tickets</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item, index) => (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.notes}</td>
                <td>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </td>
                <td>{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
