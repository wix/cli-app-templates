import React, { type FC } from 'react';
import { Box, Cell, DatePicker, FormField, Layout } from '@wix/design-system';

interface Props {
  startDate: number;
  endDate: number;
  onChange?: (startDate: number, endDate: number) => void;
}

export const DataRangePicker: FC<Props> = ({
  onChange,
  startDate,
  endDate,
}) => {
  return (
    <Layout>
      <Cell span={6}>
        <Box gap={2}>
          <FormField label="Start date">
            <Box marginTop={1}>
              <DatePicker
                width="100%"
                placeholderText="Select"
                value={new Date(startDate)}
                onChange={(value: Date) => onChange?.(value.getTime(), endDate)}
              />
            </Box>
          </FormField>
        </Box>
      </Cell>
      <Cell span={6}>
        <Box gap={2}>
          <FormField label="End date">
            <Box marginTop={1}>
              <DatePicker
                width="100%"
                placeholderText="Select"
                value={new Date(endDate)}
                onChange={(value: Date) =>
                  onChange?.(startDate, value.getTime())
                }
              />
            </Box>
          </FormField>
        </Box>
      </Cell>
    </Layout>
  );
};
