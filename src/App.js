import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuntityMeasurement from './Component/QuantityMeasurement'

class App extends Component {

  render() {
  return (
    <div className="App">
      <header className="App-header">

      <QuntityMeasurement />

      </header>
    </div>
  );
}
}

export default App;