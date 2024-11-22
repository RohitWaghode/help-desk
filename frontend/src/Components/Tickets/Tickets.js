import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tickets.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [status, setStatus] = useState("");
  const isUser = localStorage.getItem("user_type") === "User";
  const isAgent = localStorage.getItem("user_type") === "Agent";
  console.log("isAgent", isAgent);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/help-desk/v1/ticket/list?user_uid=${
            isUser ? localStorage.getItem("user_uid") : ""
          }`
        );

        if (response.data && response.data.output) {
          setTickets(response.data.output);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    fetchTickets();
  }, []);

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setStatus(ticket.status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const editTicket = async () => {
    if (!status) {
      alert("Select a status");
    }
    try {
      const response = await axios.put(
        `http://localhost:7000/help-desk/v1/ticket/edit`,
        {
          status,
          user_type: localStorage.getItem("user_type"),
          ticket_id: selectedTicket.ticket_id,
        }
      );

      console.log("res", response.user_type);
      if (response.data.output) {
        const updatedTicket = response.data.output;
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.ticket_id === updatedTicket.ticket_id
              ? updatedTicket
              : ticket
          )
        );
        setSelectedTicket(null);
        setStatus("");
      } else {
        alert("Failed to edit ticket: ");
      }
    } catch (err) {
      console.error("Error editing ticket:", err);
      alert("An error occurred while updating the ticket.");
    }
  };

  return (
    <div className="ticket-table">
      <h3>All Tickets</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Ticket ID</th>
              <th>Title</th>
              {!isUser && <th>Customer Name</th>}
              <th>Status</th>
              <th>Updated At</th>
              {!isUser && <th>Edit Ticket</th>}
              {!isUser && !isAgent && <th>Delete Ticket</th>}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, key) => (
              <tr key={ticket._id}>
                <td>{key + 1}</td>
                <td>
                  <Link to={`/ticket/${ticket.ticket_id}`}>
                    {ticket.ticket_id}
                  </Link>
                </td>
                <td>{ticket.title}</td>
                {!isUser && <td>{ticket.customer_name}</td>}
                <td>
                  <span className={`status ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{new Date(ticket.updated_at).toLocaleString()}</td>
                {!isUser && (
                  <td>
                    <button
                      className="ticket-btn "
                      onClick={() => handleEditTicket(ticket)}
                    >
                      Edit Ticket
                    </button>
                  </td>
                )}
                {!isUser && !isAgent && (
                  <td>
                    <button className="ticket-btn ">Delete Ticket</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={selectedTicket} className="modal">
        {selectedTicket && (
          <div className="ticket-table">
            <h3>Edit Ticket</h3>
            <div>
              <label>Status</label>
              <div>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="select-ticket"
                >
                  <option value="active" className="ticket-status">
                    Active
                  </option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div>
              <div className="modal-buttons" style={{ marginTop: 50 }}>
                <button className="new-ticket" onClick={editTicket}>
                  Save Changes
                </button>
                <button
                  className="close-ticket"
                  onClick={() => setSelectedTicket(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tickets;
