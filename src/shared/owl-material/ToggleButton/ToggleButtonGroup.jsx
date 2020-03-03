import React from 'react';
import PropTypes from 'prop-types';

import MUIToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const ToggleButtonGroup = props => (
  <MUIToggleButtonGroup {...props}>{props.children}</MUIToggleButtonGroup>
);

ToggleButtonGroup.propTypes = {
  exclusive: PropTypes.bool,
  value: PropTypes.any,
}

ToggleButtonGroup.defaultProps = {
  exclusive: false,
}

export default ToggleButtonGroup;
