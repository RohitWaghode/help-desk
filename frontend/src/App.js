import Sidebar from "./Components/Sidebar/Sidebar";
import Tickets from "./Components/Tickets/Tickets";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Tickets />
      </div>
    </div>
  );
}

export default App;
