import React from 'react';

import MUICardActions from '@material-ui/core/CardActions';

const CardActions = props => (
  <MUICardActions {...props}>{props.children}</MUICardActions>
)

export default CardActions;
