import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FieldSet,
  Slider,
  ToggleSwitch,
  FormField,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { CALL_TO_ACTION } from './consts.js';

const Panel: FC = () => {
  const [threshold, setThreshold] = useState<number>(3);
  const [callToAction, setCallToAction] = useState<string>();
  const [showBadge, setShowBadge] = useState<string>();

  useEffect(() => {
    widget
      .getProp('threshold')
      .then((threshold) => setThreshold(threshold ? Number(threshold) : 3));
    widget.getProp('call-to-action').then(setCallToAction);
    widget.getProp('show-badge').then(setShowBadge);
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <SidePanel.Field>
        <FieldSet gap="medium" legend="Threshold" columns="auto 60px">
          <Slider
            onChange={(value) => {
              setThreshold(value as number);
              widget.setProp('threshold', value.toString());
            }}
            min={0}
            max={25}
            value={threshold}
            displayMarks={false}
          />
          <Input
            value={threshold}
            size="small"
            onChange={(event) => {
              setThreshold(Number(event.target.value));
              widget.setProp('threshold', event.target.value);
            }}
          />
        </FieldSet>
      </SidePanel.Field>
      <SidePanel.Field>
        <FormField label="Show Badge" labelPlacement="left" labelWidth="1fr">
          <ToggleSwitch
            size="small"
            checked={showBadge === 'true'}
            onChange={(event) => {
              setShowBadge(event.target.checked.toString());
              widget.setProp('show-badge', event.target.checked.toString());
            }}
          />
        </FormField>
      </SidePanel.Field>
      <SidePanel.Field>
        <FieldSet legend="Call to Action">
          <Input
            value={callToAction}
            placeholder={CALL_TO_ACTION}
            size="small"
            onChange={(event) => {
              setCallToAction(event.target.value);
              widget.setProp('call-to-action', event.target.value || CALL_TO_ACTION);
            }}
          />
        </FieldSet>
      </SidePanel.Field>
    </WixDesignSystemProvider>
  );
};

export default Panel;
