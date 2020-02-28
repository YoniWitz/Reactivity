import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/acitivity";
import { AcitivityList } from "./AcitivityList";
import { ActivityDetails } from "../details/ActivityDetails";

interface IProps {
  activities: IActivity[];
}
export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <AcitivityList activities={activities}/>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityDetails/>
      </Grid.Column>
    </Grid>
  );
};
