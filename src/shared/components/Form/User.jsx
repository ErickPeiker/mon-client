import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';

import { CompanySelect, GroupSelect } from 'components/Field';

import {
  Box,
  GridContainer,
  GridItem,
  TextField,
  Typography,
} from '@owl-material';

const UserForm = ({
  autofocus,
  showCompanySelect,
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
      { showCompanySelect &&
        <GridItem xs={12} md={4} lg={3}>
          <Field
            label={t('company')}
            name='companies'
            component={CompanySelect}
            multiple
            required
            autoFocus={autofocus}
          />
        </GridItem>
      }
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('groups')}
          name='groups'
          component={GroupSelect}
          multiple
        />
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('email')}
          name='email'
          component={TextField}
          type='email'
          required
        />
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
        <Field
          label={t('password')}
          name='plainPassword'
          component={TextField}
          type='password'
        />
      </GridItem>
    </GridContainer>
  </>
);

UserForm.propTypes = {
  autofocus: PropTypes.bool,
  showCompanySelect: PropTypes.bool,
  title: PropTypes.string,
}

UserForm.defaultProps = {
  autofocus: false,
  showCompanySelect: true,
  title: null,
}

export default withTranslation('common')(UserForm);
