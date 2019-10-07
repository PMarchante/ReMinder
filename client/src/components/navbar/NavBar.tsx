import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout, user } = rootStore.userStore;

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          ReMinder
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={'/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayname}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
