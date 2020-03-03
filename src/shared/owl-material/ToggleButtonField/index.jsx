import React from 'react';

import { ToggleButton, ToggleButtonGroup } from '@owl-material';

const ToggleButtonField = ({
  meta: {
    submitting,
    error,
    touched
  },
  input: {
    onBlur,
    value,
    onChange,
    ...input
  },
  disabled,
  options,
  ...props
}) => {
  return (
    <ToggleButtonGroup
      {...props}
      value={value}
      onChange={onChange}
      size='small'
    >
      { options.map(option => (
        <ToggleButton
          key={option.value}
          value={option.value}
          disabled={disabled || submitting}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtonField;
