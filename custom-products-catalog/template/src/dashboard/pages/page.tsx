import React, { useMemo, useState } from 'react';
import {
  Box,
  Text,
  Image,
  Breadcrumbs
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withDashboard } from '@wix/dashboard-react';
import { products } from '@wix/stores';
import { withProviders } from '../withProviders';
import { useCreateProduct, useDeleteProducts } from '../hooks/stores';
import { CreateProductModal } from '../components/create-product';
import { CollectionPage } from "@wix/patterns/page";
import {
  useTableCollection,
  Table,
  PrimaryPageButton,
  useOptimisticActions,
  deleteSecondaryAction,
  MultiBulkActionToolbar
} from '@wix/patterns'
import { useWixModules } from '@wix/sdk-react';

function Products() {
  const [shown, setShown] = useState(false);
  const { queryProducts, deleteProduct } = useWixModules(products);
  const tableState = useTableCollection<products.Product>({
    queryName: 'custom-products-catalog',
    itemKey: (product: products.Product) => product._id!,
    itemName: (contact: products.Product) => contact.name!,
    limit: 20,
    fetchData: (query) => {
      const { limit, offset, search, sort } = query;
      let queryBuilder = queryProducts().limit(limit).skip(offset);

      if (search) {
        queryBuilder = queryBuilder.startsWith("name", search)
      }

      if (sort) {
        sort.forEach(s => {
          if (s.order === 'asc') {
            queryBuilder = queryBuilder.ascending(s.fieldName);
          } else if (s.order === 'desc') {
            queryBuilder = queryBuilder.descending(s.fieldName);
          }
        });
      }
      return queryBuilder.find().then(({ items = [], totalCount: total }) => {
        return {
          items,
          total,
        };
      });
    },
    fetchErrorMessage: () => 'Error fetching products',
    filters: {},
  });

  const optimisticActions = useOptimisticActions(tableState.collection, {
    orderBy: () => [],
    predicate: ({ search }) => {
      return (product) => {
        if (search) {
          return product.name.startsWith(search)
        }
        return true
      }


    },
  });

  const createProduct = useCreateProduct(optimisticActions);
  const deleteProducts = useDeleteProducts(optimisticActions);
  return (
    <CollectionPage height="100vh">
      <CollectionPage.Header
        title={{ text: 'Products' }}
        breadcrumbs={
          <Breadcrumbs
            activeId="2"
            items={[
              { id: '1', value: 'Apps', disabled: true },
              { id: '2', value: 'Products' },
            ]}
          />
        }
        primaryAction={
          <PrimaryPageButton
            text="Add Product"
            onClick={() => setShown(!shown)}
          />
        }
      />
      <CollectionPage.Content>
        <CreateProductModal showModal={shown} onSave={(productName: string) => {
          createProduct(productName)
          setShown(false)
        }}/>
        <Table
          state={tableState}
          maxSelection={20}
          bulkActionToolbar={({ selectedValues, openConfirmModal }) => {
            const disabled = selectedValues.length > 20;
            return (
              <MultiBulkActionToolbar
                primaryActionItems={[
                  {
                    label: 'Delete',
                    tooltip: disabled
                      ? 'Deleting is supported for up to 20 items'
                      : undefined,
                    disabled,
                    onClick: () => {
                      openConfirmModal({
                        theme: 'destructive',
                        primaryButtonOnClick: () => {
                          deleteProducts(selectedValues)
                        },
                      });
                    },
                  },
                ]}
              />)
          }}
          columns={[
            {
              title: '',
              width: '72px',
              render: (product) => <Image src={product.media?.mainMedia?.image?.url}/>
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
              id: 'price',
              title: 'Price',
              render: (row: products.Product) => `$${row.priceData?.price}`,
              width: '20%',
              sortable: true
            },
            {
              title: 'Type',
              render: (row: products.Product) => row.productType,
              width: '20%',
            },
          ]}
          actionCell={(_product, _index, actionCellAPI) => ({
              secondaryActions: [
                deleteSecondaryAction({
                  optimisticActions,
                  actionCellAPI,
                  submit: (products: products.Product[]) => (
                    Promise.all(
                      products.map((product: products.Product) => deleteProduct(product._id))
                    )
                  ),
                  successToast: {
                    message: `${_product.name} deleted successfully`,
                    type: 'SUCCESS',
                  },
                  errorToast: () => 'An error',
                }),
              ]
            }
          )}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
}

export default withDashboard(withProviders(Products));
