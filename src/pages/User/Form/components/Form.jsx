import React from 'react';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm } from 'redux-form';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@owl-material';

import { PhysicalPersonForm, UserForm } from 'components/Form';

const UserFormComponent = ({ handleSubmit, loading, t, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant='h6'>
            { t('user') }
          </Typography>
          <FormSection
            title={t('personal data')}
            name='physicalPerson'
            component={PhysicalPersonForm}
          />
          <FormSection
            title={t('user data')}
            name=''
            component={UserForm}
          />
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            type='submit'
          >
            { t('save') }
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default reduxForm({
  form: 'UserForm',
  enableReinitialize: true,
})(withTranslation('common')(UserFormComponent));
