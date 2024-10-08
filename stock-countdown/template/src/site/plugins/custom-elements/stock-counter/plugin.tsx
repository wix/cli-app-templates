import React, { useEffect, useState, type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { Badge, Box, Text, WixDesignSystemProvider } from '@wix/design-system';
import { Tag as TagIcon } from '@wix/wix-ui-icons-common';
import { inventory } from '@wix/stores';
import { window as siteWindow } from '@wix/site-window';
import styles from './plugin.module.css';
import '@wix/design-system/styles.global.css';

type Props = {
  productId: string;
  threshold: string;
};

type InventoryStock = 'In Stock' | number;

function getInventoryStock(productId: string): Promise<InventoryStock> {
  return (
    inventory
      // For more information about the Inventory API, see https://dev.wix.com/docs/sdk/backend-modules/stores/inventory/query-inventory
      .queryInventory({
        query: {
          // For more information about query filters, see https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section
          filter: JSON.stringify({ productId: { ['$eq']: productId } }),
        },
      })
<<<<<<< Updated upstream
      .then((result) => result.inventoryItems[0].variants[0].quantity)
=======
      .then((result) => {
        const productInventory = result.inventoryItems[0];

        let stockCount = 0;

        productInventory.variants.forEach((variant) => {
          if (variant.inStock) {
            return 'In Stock';
          }
          stockCount += variant.quantity || 0;
        });

        return stockCount;
      })
>>>>>>> Stashed changes
  );
}

const CustomElement: FC<Props> = (props) => {
  const threshold = Number(props.threshold || 3);
  const [inventoryStock, setInventoryStock] = useState<InventoryStock>();

  useEffect(() => {
    // Temporary fix for double quotes passed from custom element attributes
    const productId = props.productId.replaceAll('"', '');

    siteWindow.viewMode().then((mode) => {
      if (mode === 'Site') {
        getInventoryStock(productId).then(setInventoryStock);
      } else {
        setInventoryStock(threshold >= 1 ? threshold - 1 : 'In Stock');
      }
    });
  }, [props.productId, threshold]);

  if (!inventoryStock || (inventoryStock !== 'In Stock' && threshold < inventoryStock)) {
    return null;
  }

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Box
        align="left"
        direction="vertical"
        gap="1"
        paddingTop={2}
        className={styles.root}
      >
        {inventoryStock === 'In Stock' ? (
          <Box>
            <Badge prefixIcon={<TagIcon />} skin="neutralSuccess">
              {inventoryStock}
            </Badge>
          </Box>
        ) : (
          <>
            <Box>
              <Badge prefixIcon={<TagIcon />} skin="standard" uppercase={false}>
                Selling fast
              </Badge>
            </Box>
            <Box direction="vertical">
              <Text>{`Only ${inventoryStock} items left in stock`}</Text>
              <Text size="tiny" light secondary>
                Don't miss your chance
              </Text>
            </Box>
          </>
        )}
      </Box>
    </WixDesignSystemProvider>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactDOM as any,
  {
    props: {
      productId: 'string',
      threshold: 'string',
    },
  }
);

export default customElement;
