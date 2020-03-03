import React from 'react';
import MUIBottomNavigation from '@material-ui/core/BottomNavigation';

const BottomNavigation = props => (
	<MUIBottomNavigation {...props}>{props.children}</MUIBottomNavigation>
)

export default BottomNavigation;
