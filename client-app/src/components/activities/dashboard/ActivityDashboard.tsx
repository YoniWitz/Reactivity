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

  const handleSelectedActivity = (id: string | null) => setSelectedActivity(activities.filter(activity => activity.id === id)[0]);

  return (
    <Grid>
      <Grid.Column width="10">
        <AcitivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails selectedActivity={selectedActivity} handleSelectedActivity={handleSelectedActivity} setEditMode={setEditMode} />}
        {editMode && <ActivityForm onCancelForm={setEditMode} presentActivity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  );
};
