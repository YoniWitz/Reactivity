import React, { useState } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/acitivity";

interface IProps {
  activities: IActivity[];
  handleSelectedActivity: (id: string | null) => void;
  handleDeleteActivity: (id: string) => Promise<unknown>;
}
export const AcitivityList: React.FC<IProps> = ({ activities, handleSelectedActivity, handleDeleteActivity }) => {
  let [loading, setLoading] = useState<boolean>(false);

  const handleDeleteButton = (id: string) => {
    setLoading(true);
    handleDeleteActivity(id)
    .then(() => setLoading(false))
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
                  loading={loading}
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
