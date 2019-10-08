import React, { useState, Fragment, useContext } from 'react';
import { Card, Button, Segment, Transition } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IReminder } from '../models/reminder';
import format from 'date-fns/esm/format';
import { RootStoreContext } from '../stores/rootStore';

interface IProps {
  reminder: IReminder;
}

const ReminderDetail: React.FC<IProps> = ({ reminder }) => {
  const [map, setMap] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { change } = rootStore.reminderStore;

  return (
    <Fragment>
      <Card>
        <Card.Content>
          <Card.Header content={reminder.title} />
          <Card.Meta content={format(reminder.date, 'MMM d YYY h:mm a')} />
          <Card.Description content={reminder.description} />
        </Card.Content>
        <Card.Content extra>
          <Button
            compact
            size='mini'
            icon='angle double down'
            floated='right'
            onClick={() => setMap(!map)}
          />
        </Card.Content>
      </Card>
      <Transition visible={map && change} animation='fade'>
        <Segment>
          t is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Segment>
      </Transition>
    </Fragment>
  );
};

export default observer(ReminderDetail);
