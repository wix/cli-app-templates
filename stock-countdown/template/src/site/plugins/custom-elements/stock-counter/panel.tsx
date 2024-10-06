import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const Panel: FC = () => {
  const [threshold, setThreshold] = useState<number>(3);

  useEffect(() => {
    widget.getProp('threshold').then(threshold => setThreshold(Number(threshold) ?? 3));
  }, [setThreshold]);

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300">
        <SidePanel.Content noPadding stretchVertically>
          <SidePanel.Field>
            <FormField label="Threshold">
              <Input
                type="number"
                value={threshold}
                onChange={(event) => {
                  const updatedThreshold = Number(event.target.value);
                  setThreshold(updatedThreshold);
                  widget.setProp('threshold', updatedThreshold.toString());
                }}
              />
            </FormField>
          </SidePanel.Field>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;