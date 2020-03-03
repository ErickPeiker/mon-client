import React from 'react';
// import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import MUICheckbox from '@material-ui/core/Checkbox';

const Checkbox = (...props) => {

	//console.log("Checkbox: "+JSON.stringify(props));


	return (
		<MUICheckbox {...props} />
	)
}

export default Checkbox;
