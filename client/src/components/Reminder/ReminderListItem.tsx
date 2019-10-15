import React, { useContext } from 'react';
import { List, Popup, Button, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { IReminder } from '../models/reminder';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  reminder: IReminder;
  setOpen: (b: boolean) => void;
  open: boolean;
  setSelectedReminder: (r: IReminder) => void;
}

const ReminderListItem: React.FC<IProps> = ({
  reminder,
  setOpen,
  open,
  setSelectedReminder
}) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteReminder } = rootStore.reminderStore;
  return (
    <List selection verticalAlign='middle' animated relaxed='very'>
      <Popup
        flowing
        hoverable
        position='right center'
        style={{
          zIndex: 500
        }}
        trigger={
          <List.Item
            onClick={() => {
              setSelectedReminder(reminder);
              setOpen(!open);
            }}>
            <List.Content>
              <List.Header as='h3'>{reminder.title}</List.Header>
              <List.Item>{format(reminder.date, 'MMM d YYY h:mm a')}</List.Item>
              <List.Description>{reminder.description}</List.Description>
            </List.Content>
          </List.Item>
        }>
        <Segment color='red'>
          <p>This will permanantly delete the reminder!</p>
          <Button
            content='Delete'
            negative
            onClick={() => deleteReminder(reminder)}
          />
        </Segment>
      </Popup>
    </List>
  );
};

export default observer(ReminderListItem);
