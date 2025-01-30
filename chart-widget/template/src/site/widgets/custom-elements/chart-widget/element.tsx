import React, { type FC, useMemo } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import {
  DEFAULT_TYPE,
  DEFAULT_ITEMS,
  type ChartItem,
  DEFAULT_LEGEND_STYLE,
  type LegendStyle,
} from './common.js';
import { BarChart } from './element/bar-chart.js';
import { PieChart } from './element/pie-chart.js';

type Props = {
  type: 'pie' | 'bar';
  items: ChartItem[];
  legendStyle?: LegendStyle;
};

const CustomElement: FC<Props> = ({
  type = DEFAULT_TYPE,
  items = DEFAULT_ITEMS,
  legendStyle = DEFAULT_LEGEND_STYLE,
}) => {
  const Chart = useMemo(() => {
    const charts = {
      pie: PieChart,
      bar: BarChart,
    };
    return charts[type];
  }, [type]);

  return <Chart items={items} legendStyle={legendStyle} />;
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
      legendStyle: 'json',
    },
  }
);

export default customElement;
