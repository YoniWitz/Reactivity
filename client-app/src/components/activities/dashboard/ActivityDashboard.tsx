import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IAcitivity";
import { AcitivityList } from "./AcitivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  handleEditSubmit: (activity: IActivity) => Promise<unknown>;
  selectedActivity: IActivity;
  setSelectedActivity: (activity: IActivity) => void;
  handleDeleteActivity: (id: string) => Promise<unknown>;
}
export const ActivityDashboard: React.FC<IProps> = ({ activities, handleEditSubmit, selectedActivity, setSelectedActivity, handleDeleteActivity }) => {

  let [editMode, setEditMode] = useState<boolean>(false);
  
  const handleSelectedActivity = (id: string | null) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <AcitivityList
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails selectedActivity={selectedActivity} handleSelectedActivity={handleSelectedActivity} setEditMode={setEditMode} />}
        {editMode && <ActivityForm setSelectedActivity={setSelectedActivity} handleSubmit={handleEditSubmit} onCancelForm={setEditMode} presentActivity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  );
};
