import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Message } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IAcitivity";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

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
  let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
     setSubmitDisabled(
       activity.title.length < 1 || activity.category.length < 1 
      || activity.city.length < 1 || activity.description.length < 1 
      || activity.venue.length < 1 || activity.date.length < 1);
  }, [activity])


  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (activity.id.length === 0) activity.id = uuid();
    handleSubmit(activity)
      .then((message) => {
        onCancelForm(false);
        toast.success(`Activity ${message}`); 
        setSelectedActivity(activity);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  return (
    <Segment>
      <Form onSubmit={handleFormSubmit} loading={loading} error>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        {(activity.title.length < 1) ? <Message error>Activity must include a title</Message> : null}
        <Form.TextArea rows="2" placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        {(activity.description.length < 1) ? <Message error>Activity must include a description</Message> : null}
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        {(activity.category.length < 1) ? <Message error>Activity must include a category</Message> : null}
        <Form.Input type="datetime-local" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        {(activity.date.length < 1) ? <Message error>Activity must include a date</Message> : null}
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        {(activity.city.length < 1) ? <Message error>Activity must include a city</Message> : null}
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        {(activity.venue.length < 1) ? <Message error>Activity must include a venue</Message> : null}
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" disabled={submitDisabled}/>
          <Button floated='left' type="button" onClick={() => onCancelForm(false)} content="Cancel" />
        </Button.Group>
      </Form>
    </Segment>
  );
};
