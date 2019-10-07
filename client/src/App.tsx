import React, { Fragment, useContext, useEffect } from 'react';
import HomePage from './components/HomePage';
import ModalContainer from './components/modals/ModalContainer';
import { withRouter, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import NavBar from './components/navbar/NavBar';
import { Container } from 'semantic-ui-react';
import NotFound from './components/errors/NotFound';
import ReminderDashboard from './components/Reminder/ReminderDashboard';
import { RootStoreContext } from './components/stores/rootStore';

const App: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser();
    }
  });

  return (
    <Fragment>
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'} //this means if url is / and anything else render whats in the body
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: 70 }}>
              <Switch>
                <Route exact path='/reminder' component={ReminderDashboard} />
                <Route />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
