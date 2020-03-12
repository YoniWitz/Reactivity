import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IAcitivity";
import { v4 as uuid } from 'uuid';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  presentActivity: IActivity | null;
  handleSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = ({ onCancelForm, presentActivity, handleSubmit, setSelectedActivity }) => {

  const initActivity = () => {
    if (presentActivity) {
      return presentActivity;
    }
    else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      }
    }
  }

  let [activity, setActivity] = useState<IActivity>(initActivity);
  let [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (activity.id.length === 0) activity.id = uuid();
    handleSubmit(activity)
      .then(() => {
        onCancelForm(false);
        setSelectedActivity(activity);
      })
      .catch(() => console.log("error creating activity"))
      .finally(() => setLoading(false));
  }

  return (
    <Segment>
      <Form onSubmit={handleFormSubmit} loading={loading}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea rows="2" placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="datetime-local" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" />
          <Button floated='left' type="button" onClick={() => onCancelForm(false)} content="Cancel" />
        </Button.Group>
      </Form>
    </Segment>
  );
};
