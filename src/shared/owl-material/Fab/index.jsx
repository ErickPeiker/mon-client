import React from 'react';

import MUIFab from '@material-ui/core/Fab';

const Fab = props => (
  <MUIFab {...props}>{props.children}</MUIFab>
)

export default Fab;
