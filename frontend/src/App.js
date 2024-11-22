import Sidebar from "./Components/Sidebar/Sidebar";
import Tickets from "./Components/Tickets/Tickets";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import CreateTicket from "./Components/Tickets/CreateTicket";
import "./App.css";
import Users from "./Components/Users/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewTicket from "./Components/Tickets/View";

function App() {
  const [isAddTiketVisible, setAddTicketVisible] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <div className="main">
                <Sidebar
                  activeTab={"Tickets"}
                  setVisible={setAddTicketVisible}
                  showAddTicket={true}
                />
                <Tickets />
                <CreateTicket
                  visible={isAddTiketVisible}
                  setVisible={setAddTicketVisible}
                />
              </div>
            }
          />
          <Route
            path="/ticket/:ticket_uid"
            element={
              <div className="main">
                <Sidebar activeTab={"All Tickets"} onBack={true} />
                <ViewTicket />
                <CreateTicket
                  visible={isAddTiketVisible}
                  setVisible={setAddTicketVisible}
                />
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/" /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
