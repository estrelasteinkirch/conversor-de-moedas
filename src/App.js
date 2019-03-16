import React, { Component } from "react";
import "./App.css";

import Conversor from "./componentes/Conversor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Conversor de Moedas</h1>
          <div className="wrapper">
            <Conversor/>
          </div>
        <footer>Code by Estrela Steinkirch</footer>
      </div>
    );
  }
}

export default App;
