import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import { SidePanel, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { DEFAULT_TYPE, DEFAULT_ITEMS, type ChartItem } from './common.js';
import Slice from './panel/slice.js';
import { ChartType } from './panel/chart-type.js';

const Panel: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState<string>('');
  const [items, setItems] = useState<ChartItem[]>([]);

  useEffect(() => {
    Promise.all([widget.getProp('type'), widget.getProp('items')]).then(([type, items]) => {
      setType(type ?? DEFAULT_TYPE);
      setItems(JSON.parse(items) ?? DEFAULT_ITEMS);
      setLoaded(true);
    });
  }, []);

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300">
        {loaded && (
          <SidePanel.Content noPadding>
            <ChartType
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
        )}
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
