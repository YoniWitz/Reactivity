import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

interface IProps{
  onCancelForm: (isEdit: boolean) => void;
}
export const ActivityForm:React.FC<IProps> = ({onCancelForm}) => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows="2" placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button.Group widths="2">
          <Button floated='right' positive type="submit" content="Submit" />
          <Button floated='left' onClick={() => onCancelForm(false)} content="Cancel"/>
        </Button.Group>     
      </Form>
    </Segment>
  );
};
