import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const Navbar = () => {
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
        <Menu.Item name="Friends">
          <Button positive content="Create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
