import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { IReminder } from '../models/reminder';

const ReminderListItem: React.FC<{ reminder: IReminder }> = ({ reminder }) => {
  //this gets the host of the event

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular style={{ marginBottom: 3! }} />
            <Item.Content>
              <Item.Header>{reminder.title}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' />
        {format(reminder.date, 'MMM d YYY h:mm a')}
      </Segment>
      <Segment clearing>
        <span>{reminder.description}</span>
        <Button floated='right' content='view' color='blue' />
      </Segment>
    </Segment.Group>
  );
};

export default ReminderListItem;
