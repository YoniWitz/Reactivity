import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/acitivity";

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  presentActivity: IActivity | null;
}
export const ActivityForm: React.FC<IProps> = ({ onCancelForm, presentActivity }) => {

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

  const handleInputChange = (event:  React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = event.currentTarget;
    console.log(value)
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log(activity);
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea rows="2" placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="string" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" />
          <Button floated='left' onClick={() => onCancelForm(false)} content="Cancel" />
        </Button.Group>
      </Form>
    </Segment>
  );
};
