import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/acitivity";
import { AcitivityList } from "./AcitivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  handleEditSubmit: (activity: IActivity) => void;

}
export const ActivityDashboard: React.FC<IProps> = ({ activities, handleEditSubmit }) => {
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
        {editMode && <ActivityForm setSelectedActivity={setSelectedActivity} handleSubmit = {handleEditSubmit} onCancelForm={setEditMode} presentActivity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  );
};
