import React from 'react';

import MUIDialog from '@material-ui/core/Dialog';
import MUIDialogActions from '@material-ui/core/DialogActions';
import MUIDialogContent from '@material-ui/core/DialogContent';
import MUIDialogTitle from '@material-ui/core/DialogTitle';

const Dialog = ({
  actions,
  children,
  open,
  onClose,
  title,
  ...props
}) => {
  return (
    <MUIDialog
      {...props}
      open={open}
      onClose={onClose}
    >
      { title && <MUIDialogTitle>{title}</MUIDialogTitle> }
      <MUIDialogContent>
        {children}
      </MUIDialogContent>
      { actions && <MUIDialogActions>{actions}</MUIDialogActions> }
    </MUIDialog>
  );
}

export default Dialog;
