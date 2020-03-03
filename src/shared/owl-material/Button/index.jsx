import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MUIButton from '@material-ui/core/Button';
import MUICircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  icon: {
    display: 'flex',
    marginRight: 10,
  },
  progress: {
    marginRight: 10,
  },
}));

const Button = ({ icon, loading, ...props }) => {
  const classes = useStyles();

  return (
    <MUIButton variant='contained' {...props}>
      { icon && !loading && <span className={classes.icon}>{icon}</span> }
      { loading && <MUICircularProgress size={24} color='inherit' className={classes.progress} /> }
      {props.children}
    </MUIButton>
  );
}

export default Button;
