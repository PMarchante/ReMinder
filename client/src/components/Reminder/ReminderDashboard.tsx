import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import ReminderList from './ReminderList';
import MyCalendar from './MyCalendar';
import LoadingComponent from '../util/LoadingComponent';

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadReminders, loading } = rootStore.reminderStore;

  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  if (loading) return <LoadingComponent content='Loading' />;
  return (
    <Grid>
      <Grid.Column width={4}>
        <ReminderList />
      </Grid.Column>
      <Grid.Column width={12}>{!loading && <MyCalendar />}</Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
