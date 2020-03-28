import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/IAcitivity";
import { Navbar } from "../../components/Navbar";
import { ActivityDashboard } from "../../components/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Loading } from "./Loading";
import { Route, Switch, Redirect } from "react-router-dom";
import { HomePage } from "../../components/home/HomePage";
import { LoginForm } from "../../components/users/form/LoginForm";
import { RegisterForm } from "../../components/users/form/RegisterForm";
import { IUser } from "../models/IUser";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';

const App = () => {
  let emptyActivity: IActivity = {
    category:'',
    city:'',
    date:'',
    description:'',
    id:'',
    title:'',
    venue:''
  }
  let [user, setUser] = useState<IUser | null>(null);
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity>(emptyActivity);
  let [loading, setLoading] = useState<boolean>(true);
  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  //called immediately after the component is mounted
  useEffect(() => {
    let tempUser: IUser = JSON.parse(window.localStorage.getItem('user')!);
    if (tempUser) {
      setUser({
        displayName: tempUser.displayName,
        token: tempUser.token,
        userName: tempUser.userName
      })

      agent.Activities.list()
        .then(returnedActivityList => {
          returnedActivityList.forEach(activity => activity.date = activity.date.split('.')[0]);
          setActivities(returnedActivityList);
        })
        //.catch(err => console.log(err, "error fetching activities data"))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false);
    }
  }, [loggedIn]);

  const handleCreateSubmit = (newActivity: IActivity) => {
    return new Promise(function (resolve, reject) {
      agent.Activities.create(newActivity)
        .then(returnedNewctivity => setActivities([...activities, returnedNewctivity]))
        .then(() => resolve('created'))
        .catch((err) => reject(err));
    })
  }

  const handleEditSubmit = (editedActivity: IActivity) => {
    return new Promise(function (resolve, reject) {
      agent.Activities.update(editedActivity.id, editedActivity)
        .then(returnedUpdatedActivity => setActivities([...activities.filter(activity => activity.id !== editedActivity.id), returnedUpdatedActivity]))
        .then(() => resolve('updated'))
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
      <ToastContainer position="bottom-right" />
      <Navbar setUser={setUser} user={user} setSelectedActivity={setSelectedActivity} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/'
            render={(props) => <HomePage {...props} user={user} />} />
          <Route path='/activities'
            render={(props) => user? 
              <ActivityDashboard {...props} handleDeleteActivity={handleDeleteActivity} 
              setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} 
              handleEditSubmit={handleEditSubmit} activities={activities} />
            : 
              <Redirect to={'/'} />}
          />
          <Route path='/login'  
            render={(props) => <LoginForm  {...props} setUser={setUser} setLoggedIn={setLoggedIn} />} />
          <Route path='/register'
            render={(props) => <RegisterForm  {...props} setUser={setUser} />} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
