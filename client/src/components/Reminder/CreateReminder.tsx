import React, { useState, useContext } from 'react';
import { Portal, Segment, Button, Form } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import { Form as FinalForm, Field } from 'react-final-form';
import { ReminderFormValues } from '../models/reminder';
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
      //console.log('ok');
      createReminder(newReminder);
    } else {
      console.log('edit');
      //editActivity(activity)
    }
  };

  const rootStore = useContext(RootStoreContext);
  const { createReminder } = rootStore.reminderStore;
  const [reminder] = useState(new ReminderFormValues());

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
                <Button content='create' positive type='submit' />
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

export default CreateReminder;
