import React, { useState } from "react";
import { Menu, Container, Button, Modal, Image } from "semantic-ui-react";
import { ActivityForm } from "./activities/form/ActivityForm";
import { IActivity } from "../app/models/IAcitivity";
import { NavLink } from "react-router-dom";
import { IUser } from "../app/models/IUser";
import { useHistory } from 'react-router-dom'

interface IProps {
  user: IUser | null;
  setUser: (IUser: null) => void;
  handleCreateSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: ((activity: IActivity) => void);
}
export const Navbar: React.FC<IProps> = ({ handleCreateSubmit, setSelectedActivity, user, setUser }) => {
  let [modalOpen, setModalOpen] = useState<boolean>(false);
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  }
  
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
        <Menu.Item position='right'>
          <Image avatar spaced='right' src={user ? user.image || '/assets/user.png' : '/assets/user.png'} />Hello {user ? user.displayName : 'Guest'}</Menu.Item>
        {user && <Menu.Item as={Button} onClick={logout}>Logout</Menu.Item>}
      </Container>
    </Menu >
  );
};
