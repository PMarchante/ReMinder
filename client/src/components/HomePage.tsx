import React, { useContext, Fragment } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginForm from './users/LoginForm';
import RegisterForm from './users/RegisterForm';
import { RootStoreContext } from './stores/rootStore';
import '../components/css/homepage.css';
const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModel } = rootStore.modalStore;
  return (
    <Container textAlign='center' style={{ marginTop: '350px' }}>
      <Container text>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${user.displayname}`}
            />
            <Button as={Link} to='/reminder' size='huge' inverted>
              Go to reminders
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' content='Welcome to ReMinder' />
            <Button onClick={() => openModel(<LoginForm />)} size='huge'>
              Login
            </Button>
            <Button
              onClick={() => {
                openModel(<RegisterForm />);
              }}
              size='huge'>
              Sign up!
            </Button>
          </Fragment>
        )}
      </Container>
    </Container>
  );
};

export default HomePage;
