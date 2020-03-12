import React, { useState } from "react";
import { Menu, Container, Button, Modal } from "semantic-ui-react";
import { ActivityForm } from "./activities/form/ActivityForm";
import { IActivity } from "../app/models/IAcitivity";
import { NavLink } from "react-router-dom";

interface IProps {
  handleCreateSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: ((activity: IActivity) => void);
}
export const Navbar: React.FC<IProps> = ({ handleCreateSubmit, setSelectedActivity }) => {
  let [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to='/' exact>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivity
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities' />
        <Modal trigger={<Button color="green" size='medium' onClick={() => setModalOpen(true)}>Create Activity</Button>} open={modalOpen}>
          <Modal.Header>Create New Activity</Modal.Header>
          <ActivityForm setSelectedActivity={setSelectedActivity} handleSubmit={handleCreateSubmit} onCancelForm={setModalOpen} presentActivity={null} />
        </Modal>
      </Container>
    </Menu>
  );
};
