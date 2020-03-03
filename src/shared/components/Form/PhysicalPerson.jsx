import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';

import {
  Box,
  DatePickerField,
  GridContainer,
  GridItem,
  SelectField,
  TextField,
  Typography,
} from '@owl-material';

const PhysicalPersonForm = ({
  autofocus,
  title,
  t,
  ...props
}) => (
  <>
    { title &&
      <Box mt={3}>
        <Typography variant='subtitle2'>
          { title }
        </Typography>
      </Box>
    }
    <GridContainer>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('name')}
          name='name'
          component={TextField}
          required
          autoFocus={autofocus}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('cpf')}
          name='cpf'
          component={TextField}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('rg')}
          name='rg'
          component={TextField}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('birthdate')}
          name='birthdate'
          component={DatePickerField}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('gender')}
          name='gender'
          component={SelectField}
          options={[
            {value: 'MASCULINO', label: 'Masculino'},
            {value: 'FEMININO', label: 'Feminino'},
          ]}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('marital status')}
          name='maritalStatus'
          component={SelectField}
          options={[
            {value: 'CASADO', label: 'Casado'},
            {value: 'SOLTEIRO', label: 'Solteiro'},
          ]}
        />
      </GridItem>
    </GridContainer>
  </>
);

PhysicalPersonForm.propTypes = {
  autofocus: PropTypes.bool,
  title: PropTypes.string,
}

PhysicalPersonForm.defaultProps = {
  autofocus: false,
  title: null,
}

export default withTranslation('common')(PhysicalPersonForm);
