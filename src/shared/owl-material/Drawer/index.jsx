import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import MUISwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MUIList from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  openedDrawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
    marginTop: 64,
    overflow: 'auto',
  },
}));

const Drawer = ({ toggle, open, variant, ...props }) => {
  const doSizeCheck = () => (window.innerWidth <= 768);
  const [isMobile, setIsMobile] = React.useState(doSizeCheck());
  const classes = useStyles();

  window.addEventListener('resize', () => {
    const checkMobile = doSizeCheck();
    if (checkMobile !== isMobile) {
      setIsMobile(checkMobile);
      toggle(!checkMobile);
    }
  });

  return (
    <MUISwipeableDrawer
      {...props}
      className={(open && !isMobile) ? classes.openedDrawer : ''}
      onClose={() => toggle(false)}
      onOpen={() => toggle(true)}
      open={open}
      variant={isMobile ? 'temporary' : variant}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <MUIList role="presentation" onClick={() => isMobile && toggle(false)}>
        {props.children}
      </MUIList>
    </MUISwipeableDrawer>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

Drawer.defaultProps = {
  variant: 'persistent',
};

export default Drawer;
