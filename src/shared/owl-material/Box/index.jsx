import React from 'react';

import MUIBox from '@material-ui/core/Box';

const Box = props => (
  <MUIBox {...props}>{props.children}</MUIBox>
)

export default Box;
