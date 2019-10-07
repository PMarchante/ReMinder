import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import { RootStoreContext } from '../stores/rootStore';
import { IUserFormValues } from '../models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../errors/ErrorMessage';

const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Welcome!'
            textAlign='center'
            color='purple'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text={'Invalid email or password'}
            />
          )}

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            content='Login'
            positive
            fluid
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
