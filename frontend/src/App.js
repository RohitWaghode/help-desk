import Sidebar from "./Components/Sidebar/Sidebar";
import Tickets from "./Components/Tickets/Tickets";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import CreateTicket from "./Components/Tickets/CreateTicket";
import "./App.css";
import Users from "./Components/Users/Users";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [me, setMe] = useState([]);
  const uid = localStorage.getItem("user_uid");
  console.log("uid", uid);

  const fetchMe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/help-desk/v1/me",
        {
          headers: {
            user_uid: uid,
          },
        }
      );
      if (response.data && response.data.output) {
        setMe(response.data.output);
        console.log("response", response.data.output);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        {/* <div className="main-content"> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Tickets />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create/ticket" element={<CreateTicket />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
