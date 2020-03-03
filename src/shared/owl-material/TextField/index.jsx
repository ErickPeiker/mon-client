import React from 'react';

import MUITextField from '@material-ui/core/TextField';

const TextField = ({
  meta: {
    submitting,
    error,
    touched
  },
  input: {
    onBlur,
    value,
    ...input
  },
  disabled,
  ...props
}) => (
  <MUITextField
    {...props}
    {...input}
    value={value}
    margin='normal'
    variant='outlined'
    fullWidth
    disabled={disabled || submitting}
    error={error && touched}
  />
);

export default TextField;
