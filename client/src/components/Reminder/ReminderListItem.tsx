import React, { useContext } from 'react';
import { List } from 'semantic-ui-react';
import { format } from 'date-fns';
import { IReminder } from '../models/reminder';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  reminder: IReminder;
  setOpen: (b: boolean) => void;
  open: boolean;
}

const ReminderListItem: React.FC<IProps> = ({ reminder, setOpen, open }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectReminder } = rootStore.reminderStore;

  return (
    <List selection verticalAlign='middle' animated relaxed='very'>
      <List.Item
        onClick={() => {
          selectReminder(reminder.id);
          setOpen(!open);
        }}>
        <List.Content>
          <List.Header as='h3'>{reminder.title}</List.Header>
          <List.Item>{format(reminder.date, 'MMM d YYY h:mm a')}</List.Item>
          <List.Description>{reminder.description}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default observer(ReminderListItem);
