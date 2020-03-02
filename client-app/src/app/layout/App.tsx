import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "./../models/acitivity";
import { Navbar } from "../../components/Navbar";
import { ActivityDashboard } from "../../components/activities/dashboard/ActivityDashboard";

const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  
  //called immediately after the component is mounted
  useEffect(() => {
    fetch("http://localhost:5000/api/activities")
      .then(response => response.json())
      .then((jsonResponse: IActivity[]) => {
        let returnedActivities:IActivity[] = [];
        jsonResponse.forEach(activity =>
          {
            activity.date = activity.date.split('.')[0].replace('T', ' ');
            returnedActivities.push(activity)
          })
        setActivities(returnedActivities);
      })
      .catch(err => console.log(err, "error fetching activities data"));
  }, []);

  const handleCreateSubmit = (newActivity: IActivity) => {
    setActivities([...activities, newActivity]);
  }

  const handleEditSubmit = (editedActivity: IActivity) => {
    setActivities([...activities.filter(activity => activity.id !== editedActivity.id), editedActivity])
  }
  return (
    <Fragment>
      <Navbar setSelectedActivity={setSelectedActivity} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} handleEditSubmit={handleEditSubmit} activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
