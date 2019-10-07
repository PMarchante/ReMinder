import React from 'react';
import { List } from 'semantic-ui-react';
import { format } from 'date-fns';
import { IReminder } from '../models/reminder';

const ReminderListItem: React.FC<{ reminder: IReminder }> = ({ reminder }) => {
  //this gets the host of the event

  return (
    <List selection verticalAlign='middle' animated relaxed='very'>
      <List.Item>
        <List.Content>
          <List.Header as='h3'>{reminder.title}</List.Header>
          <List.Item>{format(reminder.date, 'MMM d YYY h:mm a')}</List.Item>
          <List.Description>{reminder.description}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default ReminderListItem;
