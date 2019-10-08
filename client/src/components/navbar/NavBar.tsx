import React, { useContext } from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout, user } = rootStore.userStore;

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item
          header
          as={NavLink}
          exact
          to='/'
          style={{ color: '#F2F4CB', fontSize: '20px' }}>
          ReMinder
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Dropdown
              pointing='top left'
              style={{ color: '#F2F4CB', fontSize: '15px' }}
              text={user.displayname}>
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
