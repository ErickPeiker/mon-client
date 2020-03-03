import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIModal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
	modalAdvanced: {
		position:'absolute',
		top:'10%',
		height:'100%',
		width: "100%",
	  }
  }));

const Modal = props => {
	const classes = useStyles();

	return (
		<MUIModal {...props} className={classes.modalAdvanced}>
			{props.children}
		</MUIModal>
	)
}

export default Modal;
