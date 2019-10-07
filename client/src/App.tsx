import React, { Fragment } from 'react';
import HomePage from './components/HomePage';
import ModalContainer from './components/modals/ModalContainer';
import { withRouter, Route } from 'react-router';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
  return (
    <Fragment>
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
    </Fragment>
  );
};

export default withRouter(observer(App));
