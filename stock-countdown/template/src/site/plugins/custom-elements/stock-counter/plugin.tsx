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

const IN_STOCK = 'In Stock';

type InventoryStock = typeof IN_STOCK | number;

function getInventoryStock(productId: string): Promise<InventoryStock> {
  return (
    // For more information about the Inventory API, see https://dev.wix.com/docs/sdk/backend-modules/stores/inventory/query-inventory.
    inventory
      .queryInventory({
        query: {
          // For more information about query filters, see https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section.
          filter: JSON.stringify({ productId: { ['$eq']: productId } }),
        },
      })
      .then((result) => {
        const productInventory = result.inventoryItems[0];

        const shouldShowInStock = productInventory.variants.some(
          (variant) => variant.inStock && variant.quantity === undefined
        );

        if (shouldShowInStock) {
          return IN_STOCK;
        }

        return productInventory.variants.reduce((inStockCount, variant) => {
          inStockCount += variant.quantity || 0;
          return inStockCount;
        }, 0);
      })
  );
}

// Customize this component to implement custom logic, change the functionality, and customize the appearance.
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
        setInventoryStock(threshold >= 1 ? threshold - 1 : IN_STOCK);
      }
    });
  }, [props.productId, threshold]);

  if (inventoryStock === undefined) {
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
        {inventoryStock === IN_STOCK || threshold < inventoryStock ? (
          <Box>
            <Badge prefixIcon={<TagIcon />} skin="neutralSuccess">
              {IN_STOCK}
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
