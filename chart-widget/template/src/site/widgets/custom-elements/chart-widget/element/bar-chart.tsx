import React, { type FC } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartItem } from '../common.js';

type Props = {
  items: ChartItem[];
};

export const BarChart: FC<Props> = ({ items }) => {
  const data = [
    {
      name: 'Slices',
      [items[0].name]: items[0].value,
      [items[1].name]: items[1].value,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend layout="horizontal" verticalAlign="bottom" />
        {items.map((item, index) => (
          <Bar
            key={index}
            dataKey={item.name}
            fill={item.color}
            legendType="line"
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
