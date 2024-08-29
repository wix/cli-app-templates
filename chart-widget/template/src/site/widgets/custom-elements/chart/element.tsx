import React, { type FC, useMemo } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { DEFAULT_TYPE, DEFAULT_ITEMS, type ChartItem } from './common.js';
import { BarChart } from './element/bar-chart.js';
import { PieChart } from './element/pie-chart.js';

type Props = {
  type: 'pie' | 'bar';
  items: ChartItem[];
};

const CustomElement: FC<Props> = ({ type = DEFAULT_TYPE, items = DEFAULT_ITEMS }) => {
  const Chart = useMemo(() => {
    const charts = {
      pie: PieChart,
      bar: BarChart,
    };
    return charts[type];
  }, [type]);

  return <Chart items={items} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrappedCustomElement = (props: any) => <CustomElement {...props} />;

const customElement = reactToWebComponent(
  WrappedCustomElement,
  React,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactDOM as any,
  {
    props: {
      type: 'string',
      items: 'json',
    },
  }
);

export default customElement;
