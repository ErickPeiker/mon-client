import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { CHANGE_DRAWER_VISIBILITY } from 'store/actions';

import { Drawer, ListItemLink } from '@owl-material';

const menu = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Relatório',
    path: '/report',
  },
  {
    name: 'Equipamentos',
    path: '/equipment',
  },
  {
    name: 'Empresas',
    path: '/company',
  },
  {
    name: 'Usuários',
    path: '/user',
  },
]

const RenderDrawer = props => {
  const dispatch = useDispatch();
  const drawer = useSelector(state => state.drawer);

  const toggleDrawer = (open) => {
    dispatch({
      type: CHANGE_DRAWER_VISIBILITY,
      open: open
    });
  }

  return (
    <Drawer open={drawer.open} toggle={(open) => toggleDrawer(open)}>
      {menu.map((item, i) => (
        <ListItemLink
          key={i}
          primary={item.name}
          to={item.path}
          // icon={<Icon>{item.icon}</Icon>}
        />
      ))}
    </Drawer>
  );
}

export default RenderDrawer;
