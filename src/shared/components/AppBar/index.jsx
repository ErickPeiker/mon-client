import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CHANGE_DRAWER_VISIBILITY } from 'store/actions';

import {
  AppBar,
  AppBarLeftContent,
  AppBarRightContent,
  Icon,
  IconButton,
  Typography
} from '@owl-material';

import ProfileMenu from './components/ProfileMenu';

const RenderAppBar = props => {
  const dispatch = useDispatch();
  const drawer = useSelector(state => state.drawer);

  const toggleDrawer = (open) => {
    dispatch({
      type: CHANGE_DRAWER_VISIBILITY,
	  open: open
    });
  }

  return (
    <AppBar>
      <AppBarLeftContent>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={() => toggleDrawer(!drawer.open)}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant='h6'>
          OWLMO
        </Typography>
      </AppBarLeftContent>
      <AppBarRightContent>
        <ProfileMenu />
      </AppBarRightContent>
    </AppBar>
  );
}

export default RenderAppBar;
