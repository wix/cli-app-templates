import React, { type FC } from 'react';
import { Box, FieldSet, SidePanel, Thumbnail } from '@wix/design-system';
import { PieChart, BarChartSplit } from '@wix/wix-ui-icons-common';

interface Props {
  isPremium: boolean;
  type: string;
  onChange: (type: string) => void;
}

const options = [
  { value: 'pie', icon: PieChart, free: true },
  { value: 'bar', icon: BarChartSplit, free: false },
];

export const ChartType: FC<Props> = ({ type, onChange, isPremium }) => {
  return (
    <SidePanel.Field>
      <FieldSet
        legend="Chart type"
        direction="horizontal"
        gap="medium"
        columns="min-content"
      >
        {options.map(({ value, icon: Icon, free }) => (
          <Thumbnail
            key={value}
            selected={type === value}
            disabled={!free && !isPremium}
            onClick={() => onChange(value)}
            hideSelectedIcon
            noPadding
            width="38px"
            height="38px"
          >
            <Box
              height="100%"
              width="100%"
              align="center"
              verticalAlign="middle"
            >
              <Icon />
            </Box>
          </Thumbnail>
        ))}
      </FieldSet>
    </SidePanel.Field>
  );
};
