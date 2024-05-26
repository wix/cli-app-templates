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
} from '@wix/patterns'
import { useWixModules } from '@wix/sdk-react';

type TableFilters = {
  productType: Filter<products.ProductType[]>;
  lastUpdated: Filter<RangeItem<Date>>;
}

type SupportedQueryFields = Parameters<products.ProductsQueryBuilder['ascending']>[0] | Parameters<products.ProductsQueryBuilder['descending']>[0]

const productTypeToDisplayName: {[key in products.ProductType] : string | undefined} = {
  [products.ProductType.physical]: 'Physical',
  [products.ProductType.digital]: 'Digital',
  [products.ProductType.unspecified_product_type]: undefined
}

function Products() {
  const [shown, setShown] = useState(false);
  const { queryProducts, deleteProduct } = useWixModules(products);
  const tableState = useTableCollection<products.Product, TableFilters>({
    queryName: 'products-catalog',
    itemKey: (product: products.Product) => product._id!,
    itemName: (contact: products.Product) => contact.name!,
    limit: 20,
    fetchData: (query) => {
      const { limit, offset, search, sort, filters } = query;
      let queryBuilder = queryProducts().limit(limit).skip(offset);

      if (search) {
        queryBuilder = queryBuilder.startsWith("name", search)
      }

      if (filters) {
        const { productType, lastUpdated } = filters

        if (productType) {
          queryBuilder = queryBuilder.in('productType', productType)
        }

        if (lastUpdated) {
          if (lastUpdated.from) {
            queryBuilder = queryBuilder
            .gt('lastUpdated', lastUpdated.from)  
          }

          if (lastUpdated.to) {
            queryBuilder = queryBuilder
            .lt('lastUpdated', lastUpdated.to);
          }
        }
      }

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

      return queryBuilder.find().then(({ items = [], totalCount: total }) => {
        return {
          items,
          total,
        };
      });
    },
    fetchErrorMessage: () => 'Error fetching products',
    filters: {
      lastUpdated: dateRangeFilter(),
      productType: stringsArrayFilter({ itemName: (p) => productTypeToDisplayName[p] ?? p })
    },
  });

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
          const from = filters.lastUpdated.from
          const to = filters.lastUpdated.to
          const productLastUpdated = (new Date(product.lastUpdated)).getTime()

          if (from && productLastUpdated < from.getTime()) {
            return false
          }
        
          if (to && productLastUpdated > to.getTime()) {
            return false
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
          createProduct(productName)
          setShown(false)
        }}/>
        <Table
          state={tableState}
          maxSelection={20}
          filters={
            <CollectionToolbarFilters>
              <RadioGroupFilter
                accordionItemProps={{ label: 'Type' }}
                filter={tableState.collection.filters.productType}
                data={[products.ProductType.physical, products.ProductType.digital]}
              />
              <DateRangeFilter
                filter={tableState.collection.filters.lastUpdated}
                accordionItemProps={{ label: 'Last Updated' }}
              />
            </CollectionToolbarFilters>
          }
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

                return productTypeToDisplayName[row.productType] ?? row.productType
              },
              width: '100px',
            },
            {
              id: 'last-updated',
              title: 'Last Updated',
              render: (row: products.Product) => row.lastUpdated,
              width: '200px',
              defaultHidden: true,
            },
          ]}
          actionCell={(_product, _index, actionCellAPI) => ({
              secondaryActions: [
                deleteSecondaryAction({
                  optimisticActions,
                  actionCellAPI,
                  submit: (products: products.Product[]) => (
                    Promise.all(
                      products.map((product: products.Product) => deleteProduct(product._id!))
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

export default withProviders(Products);
