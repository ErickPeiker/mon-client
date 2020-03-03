import React from 'react';

import MUIIconButton from '@material-ui/core/IconButton';

const IconButton = props => (
  <MUIIconButton {...props}>{props.children}</MUIIconButton>
)

export default IconButton;
