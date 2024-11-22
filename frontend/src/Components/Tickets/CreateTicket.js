import axios from "axios";
import React, { useState } from "react";

const CreateTicket = () => {
  const initilState = {
    title: "",
    customer_name: "",
  };
  const [ticket, setTicket] = useState(initilState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:7000/help-desk/v1/ticket/create`,
        ticket
      );

      if (response.data && response.data.output) {
        setTicket(initilState);
        alert("Ticket create successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tikcet-container">
      <div className="login-header">
        <h1>Create Ticket</h1>
      </div>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Ttitle</label>
        <input
          type="text"
          name="title"
          placeholder="Add your title here"
          value={ticket.title}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};

export default CreateTicket;
