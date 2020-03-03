import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';

import {
  Box,
  GridContainer,
  GridItem,
  TextField,
  Typography,
} from '@owl-material';

const LegalPersonForm = ({ autofocus, title, t, ...props }) => (
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
          label={t('cnpj')}
          name='cnpj'
          component={TextField}
          required
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('ie')}
          name='ie'
          component={TextField}
          required
        />
      </GridItem>
    </GridContainer>
  </>
);

LegalPersonForm.propTypes = {
  autofocus: PropTypes.bool,
  title: PropTypes.string,
}

LegalPersonForm.defaultProps = {
  autofocus: false,
  title: null,
}

export default withTranslation('common')(LegalPersonForm);
