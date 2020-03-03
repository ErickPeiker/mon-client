import React from 'react';
import MomentUtils from '@date-io/moment';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    date ? input.onChange(date.format('YYYY-MM-DD HH:mm')) : input.onChange(null);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        {...props}
        {...input}
        margin='normal'
        variant='inline'
        inputVariant='outlined'
        fullWidth
        format='DD/MM/YYYY HH:mm'
        ampm={false}
        value={value ? moment(value) : null}
        disabled={disabled || submitting}
        onBlur={() => onBlur(value ? moment(value).format('YYYY-MM-DD HH:mm') : null)}
        error={error && touched}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
