import React, { useState } from "react";
import { Menu, Container, Button, Modal } from "semantic-ui-react";
import { ActivityForm } from "./activities/form/ActivityForm";
import { IActivity } from "../app/models/acitivity";

interface IProps {
  handleCreateSubmit: (activity: IActivity) => void;
  setSelectedActivity:((activity: IActivity) => void);
}
export const Navbar: React.FC<IProps> = ({ handleCreateSubmit, setSelectedActivity }) => {
  let [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivity
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Modal trigger={<Button color="green" size='medium' onClick={() => setModalOpen(true)}>Create Activity</Button>}
          open={modalOpen}
        >
          <ActivityForm setSelectedActivity={setSelectedActivity} handleSubmit={handleCreateSubmit} onCancelForm={setModalOpen} presentActivity={null} />
        </Modal>
      </Container>
    </Menu>
  );
};
