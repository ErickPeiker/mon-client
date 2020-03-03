import React from 'react';

import MUIGrid from '@material-ui/core/Grid';

const Grid = props => (
  <MUIGrid {...props} item>{props.children}</MUIGrid>
)

export default Grid;
