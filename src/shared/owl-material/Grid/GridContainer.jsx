import React from 'react';

import MUIGrid from '@material-ui/core/Grid';

const Grid = props => (
  <MUIGrid {...props} container spacing={2}>{props.children}</MUIGrid>
)

export default Grid;
