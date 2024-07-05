import React, { useState, useEffect } from 'react';
import { WixProvider, useWixModules } from '@wix/sdk-react';
import { editor, widget } from '@wix/editor';
import { SidePanel, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { DEFAULT_TYPE, DEFAULT_ITEMS, type ChartItem } from './common.js';
import Slice from './panel/slice.js';
import { ChartType } from './panel/chart-type.js';

function Panel() {
  const { setProp, getProp } = useWixModules(widget);
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState<string>('');
  const [items, setItems] = useState<ChartItem[]>([]);

  useEffect(() => {
    Promise.all([getProp('type'), getProp('items')]).then(([type, items]) => {
      setType(type ?? DEFAULT_TYPE);
      setItems(JSON.parse(items) ?? DEFAULT_ITEMS);
      setLoaded(true);
    });
  }, [getProp]);

  return (
    <SidePanel width="300">
      {loaded && (
        <SidePanel.Content noPadding>
          <ChartType
            type={type}
            onChange={(type) => {
              setType(type);
              setProp('type', type);
            }}
          />
          {items.map((item, index) => (
            <Slice
              title={`Slice ${index + 1}`}
              item={item}
              onChange={(item) => {
                const newItems = [...items];
                newItems[index] = item;
                setItems(newItems);
                setProp('items', JSON.stringify(newItems));
              }}
            />
          ))}
        </SidePanel.Content>
      )}
    </SidePanel>
  );
}

export default () => (
  <WixProvider host={editor.host()} auth={editor.auth()}>
    <WixDesignSystemProvider>
      <Panel />
    </WixDesignSystemProvider>
  </WixProvider>
);
