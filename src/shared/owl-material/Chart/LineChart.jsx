import React from 'react';

import {
  // Brush,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
Legend
} from 'recharts';

import colors from './colors';
import { renderLegend, renderTooltip } from './BaseChart';

const LineChartComponent = ({ data, height, legendLimit, onClick, valueFormatter, ...props }) => {
  const keys = data.map((elem) => (Object.keys(elem))).flat(1).filter(
    (elem, pos, arr) => arr.indexOf(elem) === pos
  ).filter((key) => (key !== 'key')).sort((a, b) => (
    data.reduce((value, item) => (
      value += item[b] || 0
    ), 0) - data.reduce((value, item) => (
      value += item[a] || 0
    ), 0)
  ));

  return (
    <ResponsiveContainer height={height}>
      <LineChart data={data}>
        {
        // <Brush>
          // <LineChart data={data}>
            // {keys.map((key, index) => (
              // <Line key={key} type='monotone' dataKey={key} stroke='#9E9E9E' />
            // ))}
          // </LineChart>
        // </Brush>
        }
        <CartesianGrid />
        <XAxis dataKey='key' />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip
          content={renderTooltip}
          formatter={valueFormatter}
          isAnimationActive={false}
        />
        <Legend
          layout='vertical'
          verticalAlign='top'
          align='right'
          margin={{top: 0, right: 0, left: 50, bottom: 0}}
          content={renderLegend}
          payload={
            keys.slice(0, legendLimit).map((key, index) => ({
              name: key,
              value: valueFormatter(data.reduce((value, item) => (
                value += item[key] || 0
              ), 0)),
              color: colors[index] || '#9E9E9E'
            }))
          }
        />
        {keys.map((key, index) => (
          <Line
            key={key}
            dot={false}
            activeDot={{
              stroke: (colors[index] || '#9E9E9E'),
              onClick: (selected) => onClick(selected.dataKey, selected.payload.key),
            }}
            type='monotone'
            dataKey={key}
            stroke={colors[index] || '#9E9E9E'}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

LineChartComponent.defaultProps = {
  legendLimit: 10,
  valueFormatter: (value) => (value)
}

export default LineChartComponent;
