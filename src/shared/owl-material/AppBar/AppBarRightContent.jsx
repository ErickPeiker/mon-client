import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  rightContent: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const RightContent = props => {
  const classes = useStyles();

  return (
    <div className={classes.rightContent}>
      {props.children}
    </div>
  );
}

export default RightContent;
