import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-9px -2px',
  },
  chip: {
    margin: 2,
  },
  root: {
    '&:focus': {
      background: 'none',
    },
  },
}));

const SelectField = ({
  input: {
    onBlur,
    value,
    ...input
  },
  meta: {
    submitting,
    error,
    touched
  },
  multiple,
  options,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <TextField
      {...input}
      {...props}
      select
      SelectProps={{
        classes: { root: classes.root },
        multiple: multiple,
        renderValue: (selected => (
          multiple ?
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={
                    options.filter(option => (option.value === value))[0] ?
                      options.filter(option => (option.value === value))[0].label
                    :
                      ''
                  }
                  className={classes.chip}
                />
              ))}
            </div>
          :
            options.filter(option => (option.value === selected))[0] ?
              options.filter(option => (option.value === selected))[0].label
            :
              null
        )),
        open: isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        // onChange: (e, option) => {input.onChange(e.target.value); setIsOpen(false);},
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          variant: 'menu',
        }
      }}
      margin='normal'
      variant='outlined'
      fullWidth
      id={input.name}
      value={!value && multiple ? [] : value}
      disabled={disabled || submitting}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SelectField;
