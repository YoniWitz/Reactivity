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
      .then((jsonResponse: IActivity[]) => setActivities(jsonResponse))
      .catch(err => console.log(err, "error fetching activities data"));
  }, []);

  const handleCreateSubmit = (activity: IActivity) => {
    setActivities([...activities, activity]);
  }

  const handleEditSubmit = (activity: IActivity) => {
    setActivities([...activities.filter(returnActivity => returnActivity.id !== activity.id), activity])
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
