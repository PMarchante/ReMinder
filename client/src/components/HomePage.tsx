import React, { useContext, Fragment } from 'react';
import { Container, Header, Button, Image } from 'semantic-ui-react';
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
    <div className='mainpage'>
      <Container
        text
        style={{
          textAlign: 'center',
          position: 'absolute',
          top: '43%',
          left: '22%'
        }}>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${user.displayname}`}
            />
            <Button
              as={Link}
              to='/reminder'
              size='huge'
              inverted
              content='Go to reminders'
              color='blue'
            />
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' content='Welcome to ReMinder' />

            <Button
              onClick={() => openModel(<LoginForm />)}
              size='huge'
              content='Login'
              color='blue'
            />

            <Button
              color='blue'
              content='Sign up!'
              onClick={() => {
                openModel(<RegisterForm />);
              }}
              size='huge'
            />
          </Fragment>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
