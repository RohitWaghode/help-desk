import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewTicket({ route }) {
  const { ticket_uid } = useParams();

  const initialData = {
    reply_list: [],
    reply: "",
    file: "",
  };

  const [formData, setFormData] = useState(initialData);
  const { reply_list, reply, file } = formData;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/notes/list${ticket_uid}`
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_uid", localStorage.getItem("user_uid"));
    formData.append("notes", reply);
    formData.append("reply_by", localStorage.getItem("user_type"));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/notes/reply/${ticket_uid}`,
        formData
      );

      if (response.data && response.data.output) {
        alert("notes added succesfully");
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const onDownload = async (fileName) => {
    console.log("fileName", fileName);
    const parts = fileName.split("\\");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/ticket/get-file/${parts[1]}`,
        {
          responseType: "blob",
        }
      );

      const link = document.createElement("a");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      console.log("url", url);
      link.setAttribute("download", "test.png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
            <div>{new Date(item?.created_at).toLocaleString()}</div>
            <div onClick={() => onDownload(item?.attchement)}>
              View Attachement
            </div>
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
      <input
        type="file"
        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
      />
      <button className="new-ticket" onClick={addReply}>
        Add Reply
      </button>
    </div>
  );
}

export default ViewTicket;
