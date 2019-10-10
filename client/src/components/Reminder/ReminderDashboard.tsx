import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import ReminderList from './ReminderList';

import MyCalendar from './MyCalendar';

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadReminders, reminder } = rootStore.reminderStore;
  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    loadReminders();
  }, [loadReminders]); //this array is a dependency array we have to put all out dependecies used in here

  return (
    <Grid>
      <Grid.Column width={4}>
        <ReminderList />
      </Grid.Column>
      <Grid.Column width={12}>{reminder && <MyCalendar />}</Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
