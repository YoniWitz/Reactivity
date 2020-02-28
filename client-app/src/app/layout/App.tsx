import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  }

  //called immediately after the component is mounted
  componentDidMount() {
    fetch('http://localhost:5000/api/values')
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          values: jsonResponse
        })
      })
      .catch(err => console.log(err, "error fetching values data"));

  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reacitivity</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))
          }
        </List>
      </div>)
  }
}

export default App;
