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

import { EquipmentForm } from 'components/Form';

const EquipmentFormComponent = ({ handleSubmit, loading, t, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant='h6'>
            { t('equipment') }
          </Typography>
          <FormSection name='' component={EquipmentForm} />
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
  form: 'EquipmentForm',
  enableReinitialize: true,
})(withTranslation('common')(EquipmentFormComponent));
