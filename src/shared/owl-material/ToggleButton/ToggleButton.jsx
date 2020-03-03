import React from 'react';

import MUIToggleButton from '@material-ui/lab/ToggleButton';

const ToggleButton = props => (
  <MUIToggleButton {...props}>{props.children}</MUIToggleButton>
);

export default ToggleButton;
