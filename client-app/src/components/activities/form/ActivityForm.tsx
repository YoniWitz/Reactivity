import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Message } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IAcitivity";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  presentActivity: IActivity | null;
  handleSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: (activity: IActivity) => void;
}

const reviewSchema = yup.object({
  title: yup.string().required().min(1),
  category: yup.string().required().min(1),
  description: yup.string().required().min(1),
  date: yup.string().required().min(1),
  city: yup.string().required().min(1),
  venue: yup.string().required().min(1),
})

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
  let [created, setCreated] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (created) onCancelForm(false);
  }, [created])

  const handleFormSubmit = (activity: IActivity) => {
    setLoading(true);
    if (activity.id.length === 0) activity.id = uuid();
    handleSubmit(activity)
      .then((message) => {
        setSelectedActivity(activity);
        setCreated(true);
        toast.success(`Activity ${message}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const formik = useFormik({
    initialValues: initActivity(),
    onSubmit: (values, actions) => {
      actions.resetForm();
      handleFormSubmit(values);
    },
    validationSchema: reviewSchema
  });

  return (
    <Segment>
      <Form onSubmit={formik.handleSubmit} loading={loading} error>
        <Form.Input
          placeholder="Enter Title"
          label="Title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {(formik.touched.title && formik.errors.title) && <Message style={{ display: 'block' }} error >{formik.errors.title}</Message>}
        <Form.TextArea rows="2"
          placeholder="Enter Description"
          label="Description"
          name="description"
          type="TextArea"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {(formik.touched.description && formik.errors.description) && <Message style={{ display: 'block' }} error >{formik.errors.description}</Message>}
        <Form.Input
          placeholder="Enter Category"
          label="Category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        />
        {(formik.touched.category && formik.errors.category) && <Message style={{ display: 'block' }} error >{formik.errors.category}</Message>}
        <Form.Input
          placeholder="Enter Date"
          label="Date"
          name="date"
          type="datetime-local"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {(formik.touched.date && formik.errors.date) && <Message style={{ display: 'block' }} error >{formik.errors.date}</Message>}
        <Form.Input
          placeholder="Enter City"
          label="City"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {(formik.touched.city && formik.errors.city) && <Message style={{ display: 'block' }} error >{formik.errors.city}</Message>}
        <Form.Input
          placeholder="Enter Venue"
          label="Venue"
          name="venue"
          type="Text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.venue}
        />
        {(formik.touched.venue && formik.errors.venue) && <Message style={{ display: 'block' }} error >{formik.errors.venue}</Message>}
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" />
          <Button floated='left' type="button" onClick={() => formik.resetForm()} content="Clear Form" />
        </Button.Group>
      </Form>
    </Segment>
  );
};
