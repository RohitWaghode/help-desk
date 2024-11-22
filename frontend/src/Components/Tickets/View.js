import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function ViewTicket({ route }) {
  const { ticket_uid } = useParams();

  const initialData = {
    reply_list: [],
    reply: "",
  };

  const [formData, setFormData] = useState(initialData);
  console.log("formData", formData);
  const { reply_list, reply } = formData;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/help-desk/v1/notes/list${ticket_uid}`
      );
      console.log("response", response);

      if (response.data && response.data.output) {
        setFormData({ ...formData, reply_list: response.data.output });
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const addReply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7000/help-desk/v1/notes/reply/${ticket_uid}`,
        {
          user_uid: localStorage.getItem("user_uid"),
          notes: reply,
          reply_by: localStorage.getItem("user_type"),
        }
      );

      if (response.data && response.data.output) {
        alert("notes added succesfully");
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  return (
    <div className="ticket-table">
      <h4>Reply/Notes</h4>
      {Array.isArray(reply_list) && reply_list.length === 0 && (
        <div>no replay found please add to see here</div>
      )}
      {Array.isArray(reply_list) &&
        reply_list.length > 0 &&
        reply_list.map((item, key) => (
          <div style={{ marginBottom: 20 }}>
            <div>{item?.notes}</div>
            <div>reply by- {item?.reply_by}</div>
            <div>{item?.created_at}</div>
          </div>
        ))}

      <div style={{ marginTop: 50, marginBottom: 10 }}>
        <input
          type="text"
          name="add note"
          placeholder="Add your note here"
          value={reply}
          onChange={(e) => setFormData({ ...formData, reply: e.target.value })}
          required
          className="input"
        />
      </div>
      <button className="new-ticket" onClick={addReply}>
        Add Reply
      </button>
    </div>
  );
}

export default ViewTicket;
