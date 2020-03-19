import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/IAcitivity";
import { Navbar } from "../../components/Navbar";
import { ActivityDashboard } from "../../components/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Loading } from "./Loading";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "../../components/home/HomePage";
import { LoginForm } from "../../components/users/form/LoginForm";
import { IUser } from "../models/IUser";

const App = () => {
  let [user, setUser] = useState<IUser | null>(null);
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  let [loading, setLoading] = useState<boolean>(true);
 
  //called immediately after the component is mounted
  useEffect(() => {
    let tempUser:IUser = JSON.parse(localStorage.getItem('user')!);
    if(tempUser)
    setUser({
      displayName : tempUser.displayName,
      token : tempUser.token,
      userName: tempUser.userName
    })

    agent.Activities.list()
      .then(returnedActivityList => {
        returnedActivityList.forEach(activity => activity.date = activity.date.split('.')[0]);
        setActivities(returnedActivityList);
      })
      .catch(err => console.log(err, "error fetching activities data"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateSubmit = (newActivity: IActivity) => {
    return new Promise(function (resolve, reject) {
      agent.Activities.create(newActivity)
        .then(returnedNewctivity => setActivities([...activities, returnedNewctivity]))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  const handleEditSubmit = (editedActivity: IActivity) => {
    return new Promise(function (resolve, reject) {
      agent.Activities.update(editedActivity.id, editedActivity)
        .then(returnedUpdatedActivity => setActivities([...activities.filter(activity => activity.id !== editedActivity.id), returnedUpdatedActivity]))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  const handleDeleteActivity = (id: string) => {
    return new Promise(function (resolve, reject) {
      agent.Activities.delete(id)
        .then(() => setActivities(activities.filter(activity => activity.id !== id)))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  if (loading) return (<Loading content="Loading Activities..." />)
  return (
    <Fragment>
      <Navbar setUser={setUser} user={user} setSelectedActivity={setSelectedActivity} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/'
          render={(props) => <HomePage {...props} user={user}/>}/>
          <Route path='/activities'
            render={(props) => <ActivityDashboard {...props} handleDeleteActivity={handleDeleteActivity} setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} handleEditSubmit={handleEditSubmit} activities={activities} />}
          />
          <Route path='/login' 
          render={(props) => <LoginForm  {...props} setUser={setUser}/>}/>
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
