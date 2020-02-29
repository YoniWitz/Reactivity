import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/acitivity";
import { AcitivityList } from "./AcitivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
}
export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  let selectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
  };
  return (
    <Grid>
      <Grid.Column width="10">
        <AcitivityList
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity &&  <ActivityDetails selectedActivity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};
