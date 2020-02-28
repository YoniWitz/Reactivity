import React, { useState, useEffect, Fragment } from "react";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "./../models/acitivity";
import { Navbar } from "../../components/Navbar";
import { ActivityDashboard } from "../../components/activities/dashboard/ActivityDashboard";

const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);

  //called immediately after the component is mounted
  useEffect(() => {
    fetch("http://localhost:5000/api/activities")
      .then(response => response.json())
      .then((jsonResponse: IActivity[]) => setActivities(jsonResponse))
      .catch(err => console.log(err, "error fetching activities data"));
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
