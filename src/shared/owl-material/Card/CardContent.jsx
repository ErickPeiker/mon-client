import React from 'react';

import MUICardContent from '@material-ui/core/CardContent';

const CardContent = props => (
  <MUICardContent {...props}>{props.children}</MUICardContent>
)

export default CardContent;
