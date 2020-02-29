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
  let [editMode, setEditMode] = useState<boolean>(false);

  const selectActivity = (id: string) => setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
  const handleEditMode = (isEdit:boolean) => setEditMode(isEdit);


  return (
    <Grid>
      <Grid.Column width="10">
        <AcitivityList
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails selectedActivity={selectedActivity} handleEditMode={handleEditMode}/>}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};
