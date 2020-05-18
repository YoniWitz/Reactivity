import React, { useState, Fragment } from "react";
import { Menu, Container, Button, Modal, Image } from "semantic-ui-react";
import { ActivityForm } from "./activities/form/ActivityForm";
import { IActivity } from "../app/models/IAcitivity";
import { NavLink } from "react-router-dom";
import { IUser } from "../app/models/IUser";
import { history } from '../index';

interface IProps {
  user: IUser | null;
  setUser: (IUser: null) => void;
  handleCreateSubmit: (activity: IActivity) => Promise<unknown>;
  setSelectedActivity: ((activity: IActivity) => void);
}
export const Navbar: React.FC<IProps> = ({ handleCreateSubmit, setSelectedActivity, user, setUser }) => {
  let [modalOpen, setModalOpen] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  }

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to='/' exact>
          
         <span style={{fontStyle:'oblique', fontSize:'large'}}> Reactivity</span>
        </Menu.Item>
        {user &&
          <Fragment>
            <Menu.Item name="Activities" as={NavLink} to='/activities' />
            <Modal
              closeOnEscape={modalOpen}
              closeOnDimmerClick={modalOpen}
              onClose={() => setModalOpen(false)}
              open={modalOpen}
              trigger={
                <Button
                  color="green"
                  size='medium'
                  onClick={() => setModalOpen(true)}
                >
                  Create Activity
              </Button>
              }
              closeIcon
            >
              <Modal.Header>Create New Activity</Modal.Header>
              <ActivityForm setSelectedActivity={setSelectedActivity} handleSubmit={handleCreateSubmit} onCancelForm={setModalOpen} presentActivity={null} />
            </Modal>
          </Fragment>
        }
        <Menu.Item position='right'>
          <Image avatar spaced='right' src={user ? user.image || '/assets/user.png' : '/assets/user.png'} />Hello {user ? user.userName : 'Guest'}</Menu.Item>
        {user ? <Menu.Item as={Button} onClick={logout}>Logout</Menu.Item> : <><Menu.Item header as={NavLink} to='/register' exact>Register</Menu.Item><Menu.Item header as={NavLink} to='/login' exact>Login</Menu.Item></>}
      </Container>
    </Menu >
  );
};
