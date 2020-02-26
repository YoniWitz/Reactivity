import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    values: []
  }

  //called immediately after the component is mounted
  componentDidMount() {
    fetch('http://localhost:5000/api/values')
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse))
    .catch(err => console.log(err, "error fetching values data"));
    this.setState({
      values: [{ id: 1, name: 'value 101' }, { id: 2, name: 'value 202' }]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {this.state.values.map((value: any) => (
            <li key={value.id}>{value.name}</li>
            ))
          }
          </ul>
        </header>

      </div>)
  }
}

export default App;
