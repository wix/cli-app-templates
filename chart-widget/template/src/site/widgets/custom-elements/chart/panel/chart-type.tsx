import React from 'react';
import { FieldSet, SidePanel, ToggleButton } from '@wix/design-system';
import { PieChart, BarChartSplit } from '@wix/wix-ui-icons-common';

interface Props {
  type: string;
  onChange: (type: string) => void;
}

export function ChartType({ type, onChange }: Props) {
  return (
    <SidePanel.Field>
      <FieldSet legend="Chart Type" columns="35px 35px">
        <ToggleButton
          selected={type === 'pie'}
          onClick={() => onChange('pie')}
          labelValue="Pie"
          size="medium"
        >
          <PieChart />
        </ToggleButton>
        <ToggleButton
          selected={type === 'bar'}
          onClick={() => onChange('bar')}
          labelValue="Bar"
          size="medium"
        >
          <BarChartSplit />
        </ToggleButton>
      </FieldSet>
    </SidePanel.Field>
  );
}
