import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const ListItemLink = ({ icon, primary, secondary, to, ...props}) => (
  <ListItem button component={Link} to={to}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

export default ListItemLink;
