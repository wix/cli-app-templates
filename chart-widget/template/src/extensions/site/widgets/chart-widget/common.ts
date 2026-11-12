export type ChartItem = {
  name: string;
  value: number;
  color: string;
};

export const DEFAULT_TYPE = 'pie';
export const DEFAULT_ITEMS: ChartItem[] = [
  { name: 'Yes', value: 20, color: '#F6B4EB' },
  { name: 'No', value: 10, color: '#FF5B37' },
];

export type LegendStyle = {
  font: string;
  textDecoration?: string;
};

export const DEFAULT_LEGEND_STYLE: LegendStyle = {
  font: 'var(--wst-font-style-body-small, inherit)',
};
