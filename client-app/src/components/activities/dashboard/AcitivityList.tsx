import React, { useState } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IAcitivity";
import { toast } from "react-toastify";

interface IProps {
  activities: IActivity[];
  handleSelectedActivity: (id: string | null) => void;
  handleDeleteActivity: (id: string) => Promise<unknown>;
}
export const AcitivityList: React.FC<IProps> = ({ activities, handleSelectedActivity, handleDeleteActivity }) => {
  let [target, setTarget] = useState<string>('');

  const handleDeleteButton = (id: string) => {
    setTarget(id);
    handleDeleteActivity(id)
      .then(() => {handleSelectedActivity(''); toast.success('Activity deleted');})
      .catch((err) => console.log(err, "error deleting activity")
      );
  }

  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => handleDeleteButton(activity.id)}
                  loading={target === activity.id}
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => handleSelectedActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
