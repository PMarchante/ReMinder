import React, { useContext, Fragment } from 'react';
import { Item, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { format } from 'date-fns';
import ReminderListItem from './ReminderListItem';

const ReminderList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { remindersByDate } = rootStore.reminderStore;

  return (
    <Fragment>
      {remindersByDate.map(([group, reminders]) => (
        <Segment key={group}>
          <Item.Group divided>
            {reminders.map((reminder) => (
              <ReminderListItem key={reminder.id} reminder={reminder} />
            ))}
          </Item.Group>
        </Segment>
      ))}
    </Fragment>
  );
};

export default observer(ReminderList);
