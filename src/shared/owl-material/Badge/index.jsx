import React from 'react';

import MUIBadge from '@material-ui/core/Badge';

const Badge = props => (
  <MUIBadge {...props}>{props.children}</MUIBadge>
)

export default Badge;
