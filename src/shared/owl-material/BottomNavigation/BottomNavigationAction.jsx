import React from 'react';
import MUIBottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const BottomNavigationAction = props => (
	<MUIBottomNavigationAction {...props}>{props.children}</MUIBottomNavigationAction>
)

export default BottomNavigationAction;
