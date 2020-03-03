import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "./../models/acitivity";
import { Navbar } from "../../components/Navbar";
import { ActivityDashboard } from "../../components/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";

const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  //called immediately after the component is mounted
  useEffect(() => {
    agent.Activities.list()
      .then(returnedActivityList => {
        returnedActivityList.forEach(activity => activity.date = activity.date.split('.')[0]);
        setActivities(returnedActivityList);
      })
      .catch(err => console.log(err, "error fetching activities data"));
  }, []);

  const handleCreateSubmit = (newActivity: IActivity) => {
    agent.Activities.create(newActivity)
      .then(returnedNewctivity => setActivities([...activities, returnedNewctivity]))
      .catch(err => console.log(err));
    ;
  }

  const handleEditSubmit = (editedActivity: IActivity) => {
    agent.Activities.update(editedActivity.id, editedActivity)
      .then(returnedUpdatedActivity => setActivities([...activities.filter(activity => activity.id !== editedActivity.id), returnedUpdatedActivity]))
      .catch(err => console.log(err));
  }

  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id)
      .then(() => setActivities(activities.filter(activity => activity.id !== id)))
      .catch(err => console.log(err));
  }
  return (
    <Fragment>
      <Navbar setSelectedActivity={setSelectedActivity} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard handleDeleteActivity={handleDeleteActivity} setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} handleEditSubmit={handleEditSubmit} activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
