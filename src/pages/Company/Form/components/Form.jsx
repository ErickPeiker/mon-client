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

import {
  LegalPersonForm,
  CompanyForm,
  UserForm,
  PhysicalPersonForm,
} from 'components/Form';

const CompanyFormComponent = ({
  handleSubmit,
  loading,
  initialValues,
  t,
  ...props
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant='h6'>
            { t('company register') }
          </Typography>
          <FormSection
            title={t('company data')}
            name={!initialValues.id ? 'companies[0].legalPerson' : 'legalPerson'}
            component={LegalPersonForm}
            autofocus
          />
          <FormSection
            name={!initialValues.id ? 'companies[0]' : ''}
            component={CompanyForm}
          />
          {!initialValues.id &&
            <>
              <FormSection
                title={t('personal data')}
                name='physicalPerson'
                component={PhysicalPersonForm}
                showCompanySelect={false}
              />
              <FormSection
                title={t('user data')}
                name=''
                component={UserForm}
                showCompanySelect={false}
              />
            </>
          }
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
  form: 'CompanyForm',
  enableReinitialize: true,
})(withTranslation('common')(CompanyFormComponent));
