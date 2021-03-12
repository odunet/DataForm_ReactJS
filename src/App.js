import React, { useState } from 'react';
import logo from './logo.png';
import loader from './loader.gif';
import './App.css';

const App = () => {

  //Form handling
  const [ClientName, setClientName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [RepName, setRepName] = useState("");
  const [RepPhone, setRepPhone] = useState("");
  const [RepEmail, setRepEmail] = useState("");


  //Function to handle submit button
  const handleSubmit= (e) => {
    e.preventDefault();

    if (location === "") {
      alert ("Kindly put click the button to get current location");
      return
    }

    if (ClientName === "" || fieldName === "" || RepName === "" || RepEmail === "" || RepPhone === "") {
      alert ("One or more of the fields is missing!");
      return
    }

    //Hide button and start loader
    e.target.style.display = "none";
    e.target.parentNode.children[8].childNodes[0].style.display = "";

    //Form Submission POST request using fetch() 
    fetch("https://api.jsonbin.io/v3/b", { 
    
        // Adding method type 
        method: "POST", 
        
        // Adding body or contents to send 
        body: JSON.stringify({ 
            ClientName: ClientName, 
            fieldName: fieldName, 
            RepName: RepName,
            RepPhone: RepPhone,
            RepEmail: RepEmail,
            Location: location,
        }), 
        
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json",
            "X-Master-Key": "$2b$10$QFZzyMSPBRMT8aYlYcqfdO0v/Pu3/rqH9.XV0R2pGiyFvtCK1Pc2G",
            "X-BIN-NAME": `${fieldName}`,
            "X-COLLECTION-ID": "60452abe5e29de07fced5945",
        }
    }) 

    // Converting to JSON 
    .then(response => response.json()) 

    // Displaying results to console 
    .then(json => {
      setTimeout(() => {
        e.target.parentNode.children[8].childNodes[0].style.display = "none";
        e.target.style.display = "";
      }, 1000)
        console.log(JSON.stringify(json));
    })
    .catch(err => console.log(err)); 

    //Clear feild
    setClientName("");
    setFieldName("");
    setRepName("");
    setRepPhone("");
    setRepEmail("");
    setLocation("");
  }


  //GEOLOCATION API

  //Set state for add task form
  const [location, setLocation] = React.useState("")

  function getLocation(e) {
    e.preventDefault(e)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
  var temp = "Lat: " + position.coords.latitude + " and Long: " + position.coords.longitude;
  // setLocation(temp);
  setLocation(temp)
  }

  return (
    <div className="main">
      <header className="nav">
        <h1 id="logoText">Schlumberger</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <div>
          <p>
            Security Clearance Data Form | Amenam
          </p>
        </div>
        <div id="form">
          <div className="card">
            <form>
              <div id="location">
                <p id="locationText">
                  {location}
                </p>
              </div>
              <button className="btn" id="btn" onClick={(e) => getLocation(e)}>Click <b style={{color: "#003366"}}>Here</b> to get current location!</button>
              <div>
              <i className="material-icons">info</i>
              <input className="formContent" type="text" value={ClientName} onChange={e => setClientName(e.target.value)} placeholder="Client" required/>
              </div>
              <div>
              <i className="material-icons">info</i>
              <input className="formContent" type="text" value={fieldName} onChange={e => setFieldName(e.target.value)} placeholder="Field Name" required/>
              </div>
              <div>
              <i className="material-icons">info</i>
              <input className="formContent" type="text" value={RepName} onChange={e => setRepName(e.target.value)} placeholder="HSE Rep Name" required/>
              </div>
              <div>
              <i className="material-icons">info</i>
              <input className="formContent" type="text" value={RepPhone} onChange={e => setRepPhone(e.target.value)} placeholder="HSE Rep Phone" required/>
              </div>
              <div>
              <i className="material-icons">info</i>
              <input className="formContent" type="text" value={RepEmail} onChange={e => setRepEmail(e.target.value)} placeholder="HSE Rep Email" required/>
              </div>
              <input className="btn" id="btnS" style={{display: ""}} onClick={e => handleSubmit(e)} type="submit" value="Submit Data" required/>
              <div>
                <img className="loader" style={{display: "none"}} width="100" height="100" alt="loading GIF" src={loader}/>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
