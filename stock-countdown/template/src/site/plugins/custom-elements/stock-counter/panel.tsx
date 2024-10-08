import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

// Customize this panel to add more settings or change the appearance.
const Panel: FC = () => {
  const [threshold, setThreshold] = useState<string>('3');

  useEffect(() => {
    widget
      .getProp('threshold')
      .then((threshold) => setThreshold(threshold || '3'));
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
                  setThreshold(event.target.value);
                  widget.setProp('threshold', event.target.value);
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
