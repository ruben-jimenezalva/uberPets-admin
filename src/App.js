import React, { Component } from "react";
import Routes from "./utils/Routes";
import Auth from "./utils/auth";
import Header from "./Header";
import './App.css';

class App extends Component {

  handleLogout = async event => {
    Auth.clearSession();
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <Routes />
        <footer className="footerApp">
            UberPets Derechos reservados &copy; 1C-2019
        </footer>
      </div>
    );
  }

}

export default App;
