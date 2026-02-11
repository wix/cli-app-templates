import React, { type FC } from 'react';
import { Box, FieldSet, SidePanel, Thumbnail } from '@wix/design-system';
import { PieChart, BarChartSplit } from '@wix/wix-ui-icons-common';

interface Props {
  type: string;
  onChange: (type: string) => void;
}

const options = [
  { value: 'pie', icon: PieChart },
  { value: 'bar', icon: BarChartSplit },
];

export const ChartType: FC<Props> = ({ type, onChange }) => {
  return (
    <SidePanel.Field>
      <FieldSet
        legend="Chart type"
        direction="horizontal"
        gap="medium"
        columns="min-content"
      >
        {options.map(({ value, icon: Icon }) => (
          <Thumbnail
            key={value}
            selected={type === value}
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
