import React from 'react';

import MUICard from '@material-ui/core/Card';

const Card = props => (
  <MUICard {...props}>{props.children}</MUICard>
)

export default Card;
