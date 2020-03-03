import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  leftContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
}));

const LeftContent = props => {
  const classes = useStyles();

  return (
    <div className={classes.leftContent}>
      {props.children}
    </div>
  );
}

export default LeftContent;
