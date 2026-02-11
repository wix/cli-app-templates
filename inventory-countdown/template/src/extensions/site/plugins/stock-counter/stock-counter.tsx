import React, { useEffect, useState, type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { Badge, Box, Text, WixDesignSystemProvider } from '@wix/design-system';
import { Tag as TagIcon } from '@wix/wix-ui-icons-common';
import { inventory } from '@wix/stores';
import { window as siteWindow } from '@wix/site-window';
import styles from './stock-counter.module.css';
import '@wix/design-system/styles.global.css';
import { CALL_TO_ACTION } from './consts.js';

type Props = {
  productId: string;
  threshold: number;
  callToAction: string;
  showBadge: boolean;
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
        const productInventory = result?.inventoryItems && result.inventoryItems[0];

        if (!productInventory) {
          return 0;
        }

        const shouldShowInStock = productInventory.variants?.some(
          (variant) => variant.inStock && variant.quantity === undefined
        );

        if (shouldShowInStock) {
          return IN_STOCK;
        }

        return productInventory.variants?.reduce((inStockCount, variant) => {
          inStockCount += variant.quantity || 0;
          return inStockCount;
        }, 0) || 0;
      })
  );
}

// Customize this component to implement custom logic, change the functionality, and customize the appearance.
const CustomElement: FC<Props> = ({ threshold = 3, productId, showBadge, callToAction }) => {
  const [inventoryStock, setInventoryStock] = useState<InventoryStock>();

  useEffect(() => {
    siteWindow.viewMode().then((mode) => {
      if (mode === 'Site') {
        getInventoryStock(productId).then(setInventoryStock);
      } else {
        setInventoryStock(threshold >= 1 ? threshold - 1 : IN_STOCK);
      }
    });
  }, [productId, threshold]);

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
            {showBadge && (
              <Badge prefixIcon={<TagIcon />} skin="neutralSuccess">
                {IN_STOCK}
              </Badge>
            )}
          </Box>
        ) : (
          <>
            {showBadge && (
              <Box>
                <Badge
                  prefixIcon={<TagIcon />}
                  skin="standard"
                  uppercase={false}
                >
                  Selling fast
                </Badge>
              </Box>
            )}
            <Box direction="vertical">
              <Text>{`Only ${inventoryStock} items left in stock`}</Text>
              <Text size="tiny" light secondary>
                {callToAction || CALL_TO_ACTION}
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
      threshold: 'number',
      callToAction: 'string',
      showBadge: 'boolean',
    },
  }
);

export default customElement;
