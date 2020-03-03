import React from 'react';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

const DatePicker = ({
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
}) => {
  const onChange = date => {
    date && date.isValid() ? input.onChange(date.format('YYYY-MM-DD')) : input.onChange(null);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        {...props}
        {...input}
        margin='normal'
        variant='inline'
        inputVariant='outlined'
        fullWidth
        format='DD/MM/YYYY'
        value={value ? moment(value) : null}
        disabled={disabled || submitting}
        onBlur={() => onBlur(value ? moment(value).format('YYYY-MM-DD') : null)}
        error={error && touched}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
