import React, { useState } from 'react';
import {
  Box,
  Text,
  Image,
  Breadcrumbs
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { products } from '@wix/stores';
import { withProviders } from '../withProviders';
import { useCreateProduct, useDeleteProducts } from '../hooks/stores';
import { CreateProductModal } from '../components/create-product';
import { CollectionPage } from '@wix/patterns/page';
import {
  useTableCollection,
  Table,
  PrimaryPageButton,
  useOptimisticActions,
  deleteSecondaryAction,
  MultiBulkActionToolbar,
  CustomColumns,
  Filter,
  CollectionToolbarFilters,
  dateRangeFilter,
  RangeItem,
  DateRangeFilter,
  RadioGroupFilter,
  stringsArrayFilter,
} from '@wix/patterns';

// Define filter types for the table.
type TableFilters = {
  productType: Filter<products.ProductType[]>;
  lastUpdated: Filter<RangeItem<Date>>;
}

// Define the type for supported query fields.
type SupportedQueryFields = Parameters<products.ProductsQueryBuilder['ascending']>[0] | Parameters<products.ProductsQueryBuilder['descending']>[0]

// Map product types to display names.
const productTypeToDisplayName: { [key in products.ProductType]: string | undefined } = {
  [products.ProductType.physical]: 'Physical',
  [products.ProductType.digital]: 'Digital',
  [products.ProductType.unspecified_product_type]: undefined
}

function Products() {
  const [shown, setShown] = useState(false); 

  const tableState = useTableCollection<products.Product, TableFilters>({
    queryName: 'products-catalog',
    itemKey: (product: products.Product) => product._id!,
    itemName: (product: products.Product) => product.name!,
    limit: 20, // Max items per page

    // Define a function to fetch product data based on the query provided.
    fetchData: (query) => {
      const { limit, offset, search, sort, filters } = query;

      // Set the initial query parameters.
      let queryBuilder = products.queryProducts().limit(limit).skip(offset);

      // If a search string is provided, filter the products by name.
      if (search) {
        queryBuilder = queryBuilder.startsWith("name", search);
      }

      // If filters are provided, add them to the query.
      if (filters) {
        const { productType, lastUpdated } = filters;

        if (productType) {
          queryBuilder = queryBuilder.in('productType', productType);
        }

        if (lastUpdated) {
          if (lastUpdated.from) {
            queryBuilder = queryBuilder.gt('lastUpdated', lastUpdated.from);
          }

          if (lastUpdated.to) {
            queryBuilder = queryBuilder.lt('lastUpdated', lastUpdated.to);
          }
        }
      }

      // If sorting is provided, add them to the query.
      if (sort) {
        sort.forEach(s => {
          const fieldName = s.fieldName as SupportedQueryFields;
          if (s.order === 'asc') {
            queryBuilder = queryBuilder.ascending(fieldName);
          } else if (s.order === 'desc') {
            queryBuilder = queryBuilder.descending(fieldName);
          }
        });
      }

      // Execute the query, and then return the items and total count.
      return queryBuilder.find().then(({ items = [], totalCount: total }) => {
        return {
          items,
          total,
        };
      });
    },
    fetchErrorMessage: () => 'Error fetching products',
    filters: {
      lastUpdated: dateRangeFilter(), // Filter by date range
      productType: stringsArrayFilter({ itemName: (p) => productTypeToDisplayName[p] ?? p }) // Filter by product type
    },
  });

  // Set optimistic actions for changes to the product data.
  const optimisticActions = useOptimisticActions(tableState.collection, {
    orderBy: () => [],
    predicate: ({ search, filters }) => {
      return (product) => {
        if (search && !product.name?.startsWith(search)) {
          return false;
        }

        if (filters.productType && product.productType && filters.productType.indexOf(product.productType) === -1) {
          return false;
        }

        if (filters.lastUpdated && product.lastUpdated) {
          const from = filters.lastUpdated.from;
          const to = filters.lastUpdated.to;
          const productLastUpdated = (new Date(product.lastUpdated)).getTime();

          if (from && productLastUpdated < from.getTime()) {
            return false;
          }
     
          if (to && productLastUpdated > to.getTime()) {
            return false;
          }
        }

        return true;
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
          createProduct(productName);
          setShown(false);
        }}/>
        <Table
          state={tableState}
          maxSelection={20} // Max selection for bulk actions
          filters={
            <CollectionToolbarFilters>
              <RadioGroupFilter
                accordionItemProps={{ label: 'Type' }} // Filter by product type
                filter={tableState.collection.filters.productType}
                data={[products.ProductType.physical, products.ProductType.digital]}
              />
              <DateRangeFilter
                filter={tableState.collection.filters.lastUpdated} // Filter by last updated date
                accordionItemProps={{ label: 'Last Updated' }}
              />
            </CollectionToolbarFilters>
          }
          bulkActionToolbar={({ selectedValues, openConfirmModal }) => {
            const disabled = selectedValues.length > 20; // If more than 20 items are selected, disable delete.
            return (
              // Add a Custom Toolbar for bulk actions.
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
                          deleteProducts(selectedValues);
                        },
                      });
                    },
                  },
                ]}
              />
            )
          }}
          // Enable Custom Columns for the table.
          customColumns={<CustomColumns />}
          columns={[
            {
              id: 'avatar',
              name: 'Avatar',
              title: '',
              width: '72px',
              render: (product) => <Image src={product.media?.mainMedia?.image?.url}/>,
              reorderDisabled: true,
              hiddenFromCustomColumnsSelection: true
            },
            {
              id: 'name',
              title: 'Product / Description',
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
              width: 'auto',
              reorderDisabled: true,
              hideable: false
            },
            {
              id: 'price',
              title: 'Price',
              render: (row: products.Product) => `$${row.priceData?.price}`,
              width: '100px',
              sortable: true,
            },
            {
              id: 'type',
              title: 'Type',
              render: (row: products.Product) => {
                if (!row.productType) {
                  return ''
                }

                return productTypeToDisplayName[row.productType] ?? row.productType;
              },
              width: '100px',
            },
            {
              id: 'last-updated',
              title: 'Last Updated',
              render: (row: products.Product) =>
                row.lastUpdated
                ? new Date(row.lastUpdated).toLocaleDateString()
                : '',
              width: '100px',
              defaultHidden: true,
            },
          ]}
          actionCell={(_product, _index, actionCellAPI) => ({
              secondaryActions: [
              // Use the predefined deleteSecondaryAction function.
                deleteSecondaryAction({
                  optimisticActions,
                  actionCellAPI,
                  submit: (deletedProducts: products.Product[]) => (
                    Promise.all(
                      deletedProducts.map((product: products.Product) => products.deleteProduct(product._id!))
                    )
                  ),
                  successToast: {
                    message: `${_product.name} deleted successfully.`,
                    type: 'SUCCESS',
                  },
                  errorToast: () => 'Product deletion failed.',
                }),
              ]
            }
          )}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
}

// Wrap the Products component with withProviders.
export default withProviders(Products);
