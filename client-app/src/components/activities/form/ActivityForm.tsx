import React, { useState, useEffect, useRef } from "react";
import { Segment, Form, Button, Message } from "semantic-ui-react";
import { IActivity, IActivityFieldsMessages, IActivityFieldsValidations } from "../../../app/models/IAcitivity";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  presentActivity: IActivity;
  handleSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = ({ onCancelForm, presentActivity, handleSubmit, setSelectedActivity }) => {
  let [activity, setActivity] = useState<IActivity>(presentActivity);
  let [loading, setLoading] = useState(false);
  let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  let [fieldsMessages, setFieldsMessages] = useState<IActivityFieldsMessages>({
    title: null,
    description: null,
    category: null,
    date: null,
    city: null,
    venue: null
  })

  let fieldsValidations: IActivityFieldsValidations = {
    title: presentActivity.title.length >= 1,
    description: presentActivity.description.length >= 1,
    category: presentActivity.category.length >= 1,
    date: presentActivity.date.length >= 1,
    city: presentActivity.city.length >= 1,
    venue: presentActivity.venue.length >= 1,
  }

  const isInitialTitle = useRef(true);
  const isInitialDescription = useRef(true);
  const isInitialCity = useRef(true);
  const isInitialCategory = useRef(true);
  const isInitialVenue = useRef(true);
  const isInitialDate = useRef(true);

  let message = "Activity must include a ";

  useEffect(() => {
    setSubmitDisabled(!(Object.values(fieldsValidations).reduce((prevVal, validation) => prevVal && validation, true)));
  }, [activity])

  useEffect(() => {
    if (isInitialTitle.current) {
      isInitialTitle.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, title: fieldsValidations.title ?
          null : `${message} title`
      });
    }
  }, [activity.title]);

  useEffect(() => {
    if (isInitialDescription.current) {
      isInitialDescription.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, description: fieldsValidations.description ?
          null : `${message} description`
      });
    }
  }, [activity.description]);

  useEffect(() => {
    if (isInitialCity.current) {
      isInitialCity.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, city: fieldsValidations.city ?
          null : `${message} city`
      });
    }
  }, [activity.city]);

  useEffect(() => {
    if (isInitialCategory.current) {
      isInitialCategory.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, category: fieldsValidations.category ?
          null : `${message} category`
      });
    }
  }, [activity.category]);

  useEffect(() => {
    if (isInitialVenue.current) {
      isInitialVenue.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, venue: fieldsValidations.venue ?
          null : `${message} venue`
      });
    }
  }, [activity.venue]);

  useEffect(() => {
    if (isInitialDate.current) {
      isInitialDate.current = false;
    } else {
      setFieldsMessages({
        ...fieldsMessages, date: fieldsValidations.date ?
          null : `${message} date`
      });
    }
  }, [activity.date]);


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
        <Form.Input
          label='Title'
          placeholder="Title"
          name="title"
          value={activity.title}
          type="text"
          onChange={handleInputChange}
          error={fieldsMessages.title}
        />
        
        <Form.TextArea
          label='Description'
          placeholder="Description"
          name="description"
          value={activity.description}
          type="text"
          rows="2"
          onChange={handleInputChange}
          error={fieldsMessages.description}
        />
        
        <Form.Input
          label='Category'
          placeholder="Category"
          name="category"
          value={activity.category}
          type="text"
          onChange={handleInputChange}
          error={fieldsMessages.category}
        />
        
        <Form.Input
          label='Date'
          placeholder="Date"
          name="date"
          value={activity.date}
          type="datetime-local"
          onChange={handleInputChange}
          error={fieldsMessages.date}
        />
       
        <Form.Input
          label='City'
          placeholder="City"
          name="city"
          value={activity.city}
          type="text"
          onChange={handleInputChange}
          error={fieldsMessages.city}
        />
       
        <Form.Input
          label='Venue'
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          type="text"
          onChange={handleInputChange}
          error={fieldsMessages.venue}
        />
       
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" disabled={submitDisabled} />
          <Button floated='left' type="button" onClick={() => onCancelForm(false)} content="Cancel" />
        </Button.Group>
      </Form>
    </Segment>
  );
};
