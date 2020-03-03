import React from 'react';

import MUILinearProgress from '@material-ui/core/LinearProgress';

const LinearProgress = ({ progress, variant, ...props }) => (
  <MUILinearProgress
    {...props}
    variant={ progress ? 'determinate' : variant }
    value={progress}
  />
)

export default LinearProgress;
