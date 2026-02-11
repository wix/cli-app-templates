import React, { type FC } from 'react';
import { Box, RadioGroup } from '@wix/design-system';
import type { ActivationMode, ActivationOptions } from '../types.js';
import { DataRangePicker } from './date-range-picker.js';

interface Props {
  activationOptions: ActivationOptions;
  onChange: (activationOptions: ActivationOptions) => void;
}

export const ActivationConfiguration: FC<Props> = ({
  onChange,
  activationOptions,
}) => {
  return (
    <Box gap={3} direction="vertical" marginTop={1}>
      <RadioGroup
        name="Popup Activation"
        display="horizontal"
        value={activationOptions.activationMode}
        onChange={(val) =>
          onChange({
            ...activationOptions,
            activationMode: val as ActivationMode,
          })
        }
      >
        <RadioGroup.Radio value="active">Active</RadioGroup.Radio>
        <RadioGroup.Radio value="timed">Timed</RadioGroup.Radio>
        <RadioGroup.Radio value="disabled">Disabled</RadioGroup.Radio>
      </RadioGroup>
      {activationOptions.activationMode == 'timed' && (
        <DataRangePicker
          startDate={Number(
            activationOptions.startDate || new Date().getTime()
          )}
          endDate={Number(activationOptions.endDate || new Date().getTime())}
          onChange={(startDate, endDate) =>
            onChange({
              activationMode: 'timed',
              startDate: startDate.toString(),
              endDate: endDate.toString(),
            })
          }
        />
      )}
    </Box>
  );
};
