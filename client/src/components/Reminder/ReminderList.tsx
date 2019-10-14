import React, { useContext, useState } from 'react';
import { Item, Container, Header, List } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import ReminderListItem from './ReminderListItem';
import CreateReminder from './CreateReminder';

const ReminderList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { remindersByDate } = rootStore.reminderStore;
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Header content='Coming up' style={{ color: '#8CADA7' }} size='huge' />
      {remindersByDate.map(([group, reminders]) => (
        <Container key={group}>
          <Item.Group>
            {reminders.map((reminder) => (
              <ReminderListItem key={reminder.id} reminder={reminder} />
            ))}
          </Item.Group>
        </Container>
      ))}

      <List selection verticalAlign='top' animated>
        <List.Item
          onClick={() => {
            setOpen(!open);
          }}>
          <List.Content>
            <List.Header as='h3'>New +</List.Header>
          </List.Content>
        </List.Item>
      </List>
      <CreateReminder open={open} setOpen={setOpen} />
    </Container>
  );
};

export default observer(ReminderList);
