import { products } from '@wix/stores';
import { useWixModules } from '@wix/sdk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDashboard } from '@wix/dashboard-react';

export function useProductsQuery() {
  const { queryProducts } = useWixModules(products);
  return useQuery({
    queryKey: ['products'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { items } = await queryProducts().descending('lastUpdated').find();
      return items;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { showToast } = useDashboard();
  const { createProduct } = useWixModules(products);

  return useMutation({
    mutationKey: ['createProduct'],
    mutationFn: (createProductRequest?: products.CreateProductRequest) => {
      return createProduct({
        name: 'New Product',
        description: 'New Product Description',
        priceData: {
          currency: 'USD',
          price: 10,
        },
        productType: products.ProductType.physical,
        ...createProductRequest?.product,
      });
    },
    onError: () =>
      showToast({ message: 'Failed to create product', type: 'error' }),
    onSuccess: ({ product }) => {
      queryClient.setQueryData<products.Product[]>(
        ['products'],
        (oldProducts = []) =>
          product ? [product, ...oldProducts] : oldProducts
      );
      showToast({
        message: 'Product created successfully',
        type: 'success',
      });
    },
  });
}

export function useDeleteProducts({
  productIdsToDelete,
  onSuccess,
}: {
  productIdsToDelete: Set<string>;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { showToast } = useDashboard();
  const { deleteProduct } = useWixModules(products);

  return useMutation<products.DeleteProductResponse>({
    mutationKey: ['deleteProducts'],
    mutationFn: () =>
      Promise.all(
        [...productIdsToDelete].map((productId) => deleteProduct(productId))
      ),
    onError: () =>
      showToast({ message: 'Failed to delete products', type: 'error' }),
    onSuccess: () => {
      queryClient.setQueryData<products.Product[]>(
        ['products'],
        (oldProducts = []) =>
          oldProducts.filter(
            (product: products.Product) => !productIdsToDelete.has(product._id!)
          )
      );
      showToast({
        message: `${
          productIdsToDelete.size > 1 ? 'Products' : 'Product'
        } deleted successfully`,
        type: 'success',
      });
      onSuccess?.();
    },
  });
}
