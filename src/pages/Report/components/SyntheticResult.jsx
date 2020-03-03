import React from 'react';

import { Card, CardContent, LineChart } from '@owl-material';

import { formatBits } from 'shared/utils';

const SyntheticReportResult = ({ data, ...props }) => (
  <Card>
    <CardContent>
      <LineChart data={data} height={300} valueFormatter={(value) => (formatBits(value*8))} />
    </CardContent>
  </Card>
);

export default SyntheticReportResult;
