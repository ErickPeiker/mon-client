import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  GridContainer,
  GridItem,
  TextField,
  Typography,
} from '@owl-material';

const LoginForm = ({ handleSubmit, submitting, t, ...props }) => (
  <form onSubmit={handleSubmit}>
    <Card>
      <CardContent>
        <Typography variant='h6'>
          Login
        </Typography>
        <GridContainer>
          <GridItem xs={12}>
            <Field
              label={t('email')}
              name='email'
              component={TextField}
              type='email'
              autoFocus
              required
            />
          </GridItem>
          <GridItem xs={12}>
            <Field
              label={t('password')}
              name='password'
              component={TextField}
              type='password'
              required
            />
          </GridItem>
        </GridContainer>
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          type='submit'
          loading={submitting}
          disabled={submitting}
        >
          {t('login')}
        </Button>
      </CardActions>
    </Card>
  </form>
);

export default reduxForm({
  form: 'LoginForm',
})(withTranslation('common')(LoginForm));
