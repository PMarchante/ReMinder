import React, { useState, useContext, useEffect } from 'react';
import { Portal, Segment, Button, Form } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import { Form as FinalForm, Field } from 'react-final-form';
import { ReminderFormValues, IReminder } from '../models/reminder';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { combineDateAndTime } from '../util/helpers';
import { v4 as uuid } from 'uuid';
import { RootStoreContext } from '../stores/rootStore';
import DateInput from '../form/DateInput';
import TextAreaInput from '../form/TextAreaInput';
import { observer } from 'mobx-react-lite';

interface IProps {
  open: boolean;
  setOpen: (b: boolean) => void;
}

const CreateReminder: React.FC<IProps> = ({ open, setOpen }) => {
  const validate = combineValidators({
    title: isRequired({ message: 'event title is required' }),
    description: composeValidators(
      isRequired('Description'),
      hasLengthGreaterThan(4)({
        message: 'Description has to be more than 5 characters'
      })
    )(),
    date: isRequired('Date'),
    time: isRequired('Time')
  });
  const rootStore = useContext(RootStoreContext);
  const {
    createReminder,
    editReminder,
    selectedReminder
  } = rootStore.reminderStore;
  const [reminder, setReminder] = useState(new ReminderFormValues());

  useEffect(() => {
    if (selectedReminder)
      setReminder(new ReminderFormValues(selectedReminder!));
  }, [selectedReminder]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    //this function omits the date and time from the values object
    const { date, time, ...reminder } = values;
    reminder.date = dateAndTime;
    if (!reminder.id) {
      let newReminder = {
        ...reminder,
        id: uuid()
      };

      createReminder(newReminder);
    } else {
      editReminder(reminder);
    }
  };

  return (
    <Portal open={open}>
      <Segment
        style={{
          left: '25%',
          position: 'absolute',
          top: '30%',
          zIndex: 1000
        }}>
        <FinalForm
          initialValues={reminder}
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit }) => (
            <Form
              onSubmit={() => {
                handleSubmit();
                setOpen(!open);
              }}>
              <Field
                component={TextInput}
                name='title'
                placeholder='Title'
                value={reminder.title}
              />
              <Form.Group widths='equal'>
                <Field
                  component={DateInput}
                  placeholder='Date'
                  name='date'
                  date={true}
                  value={reminder.date}
                />
                <Field
                  component={DateInput}
                  placeholder='Time'
                  name='time'
                  time={true}
                  value={reminder.time}
                />
              </Form.Group>
              <Field
                component={TextAreaInput}
                name='description'
                placeholder='Descrption'
                value={reminder.description}
              />
              <Field
                component={TextInput}
                name='location'
                placeholder='Location'
                value={reminder.location}
              />

              <Button.Group widths={2}>
                <Button
                  content={reminder.id ? 'Edit' : 'Create'}
                  positive
                  type='submit'
                />
                <Button
                  content='Cancel'
                  negative
                  onClick={() => setOpen(!open)}
                />
              </Button.Group>
            </Form>
          )}
        />
      </Segment>
    </Portal>
  );
};

export default observer(CreateReminder);
