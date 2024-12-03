import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import { SidePanel, Loader, Box } from '@wix/design-system';
import { DEFAULT_TYPE, DEFAULT_ITEMS, type ChartItem } from './common.js';
import { withProviders } from './withProviders.js';
import Slice from './panel/slice.js';
import { ChartType } from './panel/chart-type.js';
import { Subscription } from './panel/subscription.js';
import { useAppInstance } from '../../../../hooks/instance.js';

const Panel: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState<string>('');
  const [items, setItems] = useState<ChartItem[]>([]);
  const { data: appInstance, isLoading: isAppInstanceLoading } = useAppInstance();

  useEffect(() => {
    Promise.all([widget.getProp('type'), widget.getProp('items')]).then(([type, items]) => {
      setType(type ?? DEFAULT_TYPE);
      setItems(JSON.parse(items) ?? DEFAULT_ITEMS);
      setLoaded(true);
    });
  }, []);

  if (isAppInstanceLoading || !loaded) {
    return (
      <Box align="center" verticalAlign="middle" height="50vh">
        <Loader text="Loading..." />
      </Box>
    )
  }

  return (
    <SidePanel width="300">
      <SidePanel.Content noPadding>
        <Subscription instance={appInstance}/>
        <ChartType
          isPremium={!appInstance.isFree}
          type={type}
          onChange={(type) => {
            setType(type);
            widget.setProp('type', type);
          }}
        />
        {items.map((item, index) => (
          <Slice
            key={index}
            title={`Slice ${index + 1}`}
            item={item}
            onChange={(item) => {
              const newItems = [...items];
              newItems[index] = item;
              setItems(newItems);
              widget.setProp('items', JSON.stringify(newItems));
            }}
          />
        ))}
      </SidePanel.Content>
    </SidePanel>
  );
};

export default withProviders(Panel);
