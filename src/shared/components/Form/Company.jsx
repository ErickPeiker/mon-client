import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';

import { CompanySelect } from 'components/Field';

import {
  Box,
  GridContainer,
  GridItem,
  SelectField,
  Typography,
} from '@owl-material';

const CompanyForm = ({
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
          label={t('type')}
          name='type'
          component={SelectField}
          options={[
            {value: 'COMPANY_MASTER', label: t('administrator')},
            {value: 'COMPANY_RESALE', label: t('resale')},
            {value: 'COMPANY_CLIENT', label: t('client')},
          ]}
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('resale')}
          name='company'
          component={CompanySelect}
          required
        />
      </GridItem>
    </GridContainer>
  </>
);

CompanyForm.propTypes = {
  autofocus: PropTypes.bool,
  title: PropTypes.string,
}

CompanyForm.defaultProps = {
  autofocus: false,
  title: null,
}

export default withTranslation('common')(CompanyForm);
