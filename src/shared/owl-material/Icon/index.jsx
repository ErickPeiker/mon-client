import React from 'react';

import MUIIcon from '@material-ui/core/Icon';

const Icon = props => (
  <MUIIcon {...props}>{props.children}</MUIIcon>
)

export default Icon;
