import React, { type FC, useState, useEffect } from 'react';
import { inputs, widget } from '@wix/editor';
import {
  Box,
  FormField,
  SidePanel,
  TextButton,
  WixDesignSystemProvider
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import {
  DEFAULT_TYPE,
  DEFAULT_ITEMS,
  type ChartItem,
  DEFAULT_LEGEND_STYLE,
  type LegendStyle
} from './common.js';
import Slice from './panel/slice.js';
import { ChartType } from './panel/chart-type.js';

const Panel: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState<string>('');
  const [legendStyle, setLegendStyle] = useState<LegendStyle | undefined>(undefined);
  const [items, setItems] = useState<ChartItem[]>([]);

  useEffect(() => {
    Promise.all([widget.getProp('type'), widget.getProp('items'), widget.getProp('legend-style')])
      .then(([type, items, storedLegendStyle]) => {
        setType(type ?? DEFAULT_TYPE);
        setItems(JSON.parse(items) ?? DEFAULT_ITEMS);
        setLoaded(true);
        setLegendStyle(JSON.parse(storedLegendStyle) ?? DEFAULT_LEGEND_STYLE);
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
            <SidePanel.Field>
              <FormField label="Legend Style" labelPlacement="left" labelWidth="1fr">
                <Box>
                  <TextButton size="small" onClick={() => {
                    void inputs.selectFont(legendStyle, {
                      onChange: (value) => {
                        if (value) {
                          setLegendStyle(value);
                          void widget.setProp('legend-style', JSON.stringify(value));
                        }
                      }
                    });
                  }}>Select</TextButton>
                </Box>
              </FormField>
            </SidePanel.Field>
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
