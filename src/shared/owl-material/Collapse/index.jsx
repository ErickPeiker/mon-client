import React from 'react';

import MUICollapse from '@material-ui/core/Collapse';

const Collapse = props => (
  <MUICollapse {...props}>{props.children}</MUICollapse>
)

export default Collapse;
