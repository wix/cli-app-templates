import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  Input,
  FieldSet,
  Slider,
  ToggleSwitch,
  FormField,
  Loader,
  Box,
} from '@wix/design-system';
import { CALL_TO_ACTION } from './consts.js';
import { withProviders } from './withProviders.js';
import { useAppInstance } from '../../../../hooks/instance.js';
import { Subscription } from './components/subscription.js';

const Panel: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [threshold, setThreshold] = useState<number>(3);
  const [callToAction, setCallToAction] = useState<string>();
  const [showBadge, setShowBadge] = useState<string>();
  const { data: appInstance, isLoading: isAppInstanceLoading } = useAppInstance();

  useEffect(() => {
    Promise.all([
      widget.getProp('threshold'),
      widget.getProp('call-to-action'),
      widget.getProp('show-badge'),
    ]).then(([threshold, callToAction, showBadge]) => {
      setThreshold(threshold ? Number(threshold) : 3);
      setCallToAction(callToAction);
      setShowBadge(showBadge);
      setLoaded(true);
    });
  }, []);

  if (!loaded || !appInstance || isAppInstanceLoading) {
    return (
      <Box align="center" verticalAlign="middle" height="50vh">
        <Loader text="Loading..." />
      </Box>
    )
  }

  return (
    <SidePanel width="300jk">
      <SidePanel.Content noPadding>
        <Subscription instance={appInstance} />
        <SidePanel.Field>
          <FieldSet gap="medium" legend="Threshold" columns="auto 60px">
            <Slider
              disabled={appInstance.isFree}
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
              disabled={appInstance.isFree}
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
              disabled={appInstance.isFree}
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
              disabled={appInstance.isFree}
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
      </SidePanel.Content>
    </SidePanel>
  );
};

export default withProviders(Panel);
