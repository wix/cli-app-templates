import React, { type FC } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
} from 'recharts';
import type { ChartItem } from '../common.js';

type Props = {
  items: ChartItem[];
};

export const PieChart: FC<Props> = ({ items }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Legend layout="horizontal" verticalAlign="middle" />
        <Pie
          data={items}
          cx="50%"
          cy="50%"
          legendType="line"
          label={true}
          innerRadius="60%"
          outerRadius="90%"
          paddingAngle={1}
          animationDuration={0}
          dataKey="value"
        >
          {items.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
