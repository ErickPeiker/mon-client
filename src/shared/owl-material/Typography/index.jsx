import React from 'react';

import MUITypography from '@material-ui/core/Typography';

const Typography = props => (
  <MUITypography {...props}>{props.children}</MUITypography>
)

export default Typography;
