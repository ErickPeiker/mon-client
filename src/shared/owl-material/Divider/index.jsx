import React from 'react';

import MUIDivider from '@material-ui/core/Divider';

const Divider = props => (
  <MUIDivider {...props}>{props.children}</MUIDivider>
)

export default Divider;
