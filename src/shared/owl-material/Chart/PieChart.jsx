import React from 'react';
import { Cell, PieChart, Pie, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
//import { renderLegend } from './BaseChart';
import colors from './colors';

const PieChartComponent = ({ data, height, onClick, valueFormatter, showLegend, ...props }) => {

	return (
		<ResponsiveContainer height={270}>
			<PieChart>
				<Tooltip formatter={valueFormatter} />
				<Pie dataKey="value"
						data={data}
						fill="#8884d8"
						nameKey="key"
						innerRadius={70}
						outerRadius={100}>
					<Label position="center" value={valueFormatter(data.reduce((value, item) => (
							value += item.value
					)	, 0))}/>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke={colors[index % colors.length]} />)
					}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);

	// return (
	// 	<ResponsiveContainer height={height}>
	// 	  <PieChart>
	// 		<Tooltip formatter={valueFormatter} />
	// 		{showLegend && (
	// 		  <Legend
	// 			layout="vertical"
	// 			verticalAlign="top"
	// 			align="right"
	// 			content={renderLegend}
	// 			payload={
	// 			  data.map((item, index) => ({
	// 				name: item.key,
	// 				value: valueFormatter ? valueFormatter(item.value) : item.value,
	// 				color: colors[index] || '#9E9E9E',
	// 			  }))
	// 			}
	// 		  />
	// 		)}
	// 		<Pie
	// 		  data={data}
	// 		  dataKey="value"
	// 		  nameKey="key"
	// 		  innerRadius="70%"
	// 		  outerRadius="100%"
	// 		  onClick={(selected) => onClick(selected.payload)}
	// 		>
	// 		  <Label
	// 			value={valueFormatter(data.reduce((value, item) => (
	// 			  value += item.value
	// 			), 0))}
	// 			position="center"
	// 		  />
	// 		  {data.map((item, index) => (
	// 			<Cell
	// 			  key={`cell-${index}`}
	// 			  fill={colors[index] || '#9E9E9E'}
	// 			  stroke={colors[index] || '#9E9E9E'}
	// 			/>
	// 		  ))}
	// 		</Pie>
	// 	  </PieChart>
	// 	</ResponsiveContainer>
	//   );
}

export default PieChartComponent;
