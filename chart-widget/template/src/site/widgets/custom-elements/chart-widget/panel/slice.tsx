import React, { type FC } from 'react';
import {
  FormField,
  FillPreview,
  Input,
  NumberInput,
  SidePanel,
  Box,
} from '@wix/design-system';
import { inputs } from '@wix/editor';
import type { ChartItem } from '../common.js';

interface Props {
  title: string;
  item: ChartItem;
  onChange: (item: ChartItem) => void;
}

const Slice: FC<Props> = ({ title, item, onChange }) => {
  return (
    <SidePanel.Section title={title}>
      <SidePanel.Field>
        <FormField label="Label">
          <Input
            value={item.name}
            type="text"
            onChange={(e) => {
              const newItem = { ...item, name: e.target.value };
              onChange(newItem);
            }}
            size="small"
          />
        </FormField>
      </SidePanel.Field>
      <SidePanel.Field>
        <FormField label="Value">
          <NumberInput
            value={item.value}
            min={0}
            onChange={(value) => {
              const newItem = { ...item, value: value ?? 0 };
              onChange(newItem);
            }}
            size="small"
            hideStepper
          />
        </FormField>
      </SidePanel.Field>
      <SidePanel.Field>
        <FormField label="Color" labelPlacement="left" labelWidth="1fr">
          <Box width="30px" height="30px">
            <FillPreview
              fill={item.color}
              onClick={() =>
                inputs.selectColor({ color: item.color }, (value) => {
                  const newItem = { ...item, color: value.color };
                  onChange(newItem);
                })
              }
            />
          </Box>
        </FormField>
      </SidePanel.Field>
    </SidePanel.Section>
  );
};

export default Slice;
