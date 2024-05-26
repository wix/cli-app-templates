import React, { useMemo, useState } from 'react';
import {
  Button,
  Page,
  Table,
  Box,
  Text,
  TextButton,
  Card,
  TableToolbar,
  Image,
  Checkbox,
  Loader,
  EmptyState,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import type { products } from '@wix/stores';
import { withProviders } from '../withProviders';
import { useDeleteProducts, useProductsQuery } from '../hooks/stores';
import { CreateProduct } from '../components/create-product';
import EmptyStateServerError from '../svg/EmptyState_ServerError.svg';

function Products() {
  const [productIdsToDelete, setProductIdsToDelete] = useState<Set<string>>(
    new Set()
  );
  const products = useProductsQuery();

  const deleteProducts = useDeleteProducts({
    productIdsToDelete,
    onSuccess: () => setProductIdsToDelete(new Set()),
  });

  const addProductToDelete = async (productId: string) => {
    if (productIdsToDelete.has(productId)) {
      productIdsToDelete.delete(productId);
      setProductIdsToDelete(new Set(productIdsToDelete));
    } else {
      productIdsToDelete.add(productId);
      setProductIdsToDelete(new Set(productIdsToDelete));
    }
  };

  const columns = useMemo(
    () => [
      {
        title: '',
        width: '20px',
        render: (row: products.Product) => (
          <Box align="center">
            <Checkbox
              checked={productIdsToDelete.has(row._id!)}
              onChange={() => addProductToDelete(row._id!)}
            />
          </Box>
        ),
      },
      {
        title: '',
        width: '72px',
        render: (row: products.Product) => (
          <Image src={row.media?.mainMedia?.image?.url} />
        ),
      },
      {
        title: 'Name',
        render: (row: products.Product) => (
          <Box direction="vertical" gap="3px">
            <Text size="medium" weight="normal">
              {row.name}
            </Text>
            <Text size="tiny" weight="thin" secondary>
              {row.description}
            </Text>
          </Box>
        ),
        width: '40%',
      },
      {
        title: 'Price',
        render: (row: products.Product) => `$${row.priceData?.price}`,
        width: '15%',
      },
      {
        title: 'Type',
        render: (row: products.Product) => row.productType,
        width: '15%',
      },
    ],
    [productIdsToDelete, addProductToDelete]
  );

  return (
    <Page height="100vh">
      <Page.Header
        title="Products"
        actionsBar={products.isSuccess && <CreateProduct />}
      />
      <Page.Content>
        {products.isLoading ? (
          <Box align="center" verticalAlign="middle" height="50vh">
            <Loader text="Loading..." />
          </Box>
        ) : products.isError ? (
          <EmptyState
            theme="page-no-border"
            image={
              <Image width="120px" src={EmptyStateServerError} transparent />
            }
            title="We couldn't load this page"
            // You likely didn't added required permissions or installed stores app in your site, please check the template documentation for more information.
            subtitle={"Looks like there was a technical issue"}
          >
            <TextButton
              onClick={() => products.refetch()}
              prefixIcon={<Icons.Refresh />}
            >
              Try Again
            </TextButton>
          </EmptyState>
        ) : (
          <Table data={products.data || []} columns={columns}>
            <Page.Sticky>
              <Card>
                <TableToolbar>
                  <TableToolbar.ItemGroup position="start">
                    <TableToolbar.Item>
                      <TableToolbar.Label>
                        {productIdsToDelete.size > 0
                          ? `${productIdsToDelete.size}/${products.data?.length} selected`
                          : `${products.data?.length || 0} products`}
                      </TableToolbar.Label>
                    </TableToolbar.Item>
                  </TableToolbar.ItemGroup>
                  {productIdsToDelete.size > 0 && (
                    <TableToolbar.ItemGroup position="end">
                      <TableToolbar.Item>
                        <Button
                          skin="destructive"
                          prefixIcon={<Icons.DeleteSmall />}
                          onClick={() => deleteProducts.mutate()}
                        >
                          Delete
                        </Button>
                      </TableToolbar.Item>
                    </TableToolbar.ItemGroup>
                  )}
                </TableToolbar>
                <Table.Titlebar />
              </Card>
            </Page.Sticky>
            <Table.Content titleBarVisible={false} />
          </Table>
        )}
      </Page.Content>
    </Page>
  );
}

export default withProviders(Products);
