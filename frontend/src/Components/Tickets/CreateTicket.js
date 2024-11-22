import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import "./Tickets.css";

const CreateTicket = ({ visible, setVisible }) => {
  const initilState = {
    title: "",
  };
  const [ticket, setTicket] = useState(initilState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const _custmomer_name = localStorage.getItem("customer_name");
    console.log("_custmomer_name", _custmomer_name);

    try {
      const response = await axios.post(
        `http://localhost:7000/help-desk/v1/ticket/create/${localStorage.getItem(
          "user_uid"
        )}`,
        { title: ticket.title, customer_name: _custmomer_name }
      );

      if (response.data && response.data.output) {
        setTicket(initilState);
        alert("Ticket create successfully");
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={visible} className="modal" onRequestClose={() => false}>
      <div className="tikcet-container">
        <div className="login-header">
          <h4>Create Ticket</h4>
        </div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Add your title here"
              value={ticket.title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
        </form>
      </div>
      <div className="modal-buttons">
        <button className="close-ticket" onClick={() => setVisible(false)}>
          Close
        </button>
        <button className="new-ticket" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateTicket;
