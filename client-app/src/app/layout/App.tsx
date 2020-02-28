import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import {IActivity} from './../models/acitivity';

interface IState {
  activities : IActivity[]
}
class App extends Component<{}, IState> {
  readonly state : IState= {
    activities: []
  }

  //called immediately after the component is mounted
  componentDidMount() {
    fetch('http://localhost:5000/api/activities')
      .then(response => response.json())
      .then((jsonResponse:IActivity[]) => {
        this.setState({
          activities: jsonResponse
        })
      })
      .catch(err =>console.log(err, "error fetching activities data"));
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reacitivity</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((activitie) => (
            <List.Item key={activitie.id}>{activitie.title}</List.Item>
          ))
          }
        </List>
      </div>)
  }
}

export default App;
