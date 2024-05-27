import { products } from '@wix/stores';
import { useWixModules } from '@wix/sdk-react';
import { useCallback } from 'react';
import { CollectionOptimisticActions } from '@wix/patterns';

export function useCreateProduct(optimisticActions: CollectionOptimisticActions<products.Product, {}>) {
  const {createProduct} = useWixModules(products);

  return useCallback((productName: string) => {
    const newProduct: products.Product = {
      _id: Date().toString(),
      name: productName,
      _createdDate: new Date(),
      lastUpdated: new Date(),
      productType: products.ProductType.physical,
      description: 'New Product Description',
      priceData: {
        currency: 'USD',
        price: 10,
      },
    };
    optimisticActions.createOne(newProduct, {
      submit: async (products: products.Product[]) => {
        const createdProduct = products[0]
        const response = await createProduct(createdProduct);
        return response.product ? [response.product] : [];
      },
      successToast: {
        message: `${newProduct.name} was successfully created`,
        type: 'SUCCESS',
      },
      errorToast: () => 'Failed to create product',
    })
  }, [optimisticActions, createProduct]);

}

export function useDeleteProducts(optimisticActions: CollectionOptimisticActions<products.Product, {}>) {
  const { deleteProduct } = useWixModules(products);

  return useCallback((productsToDelete: products.Product[] ) => {
    optimisticActions.deleteMany(productsToDelete, {
      submit: async (deletedProducts: products.Product[]) => (
        await Promise.all(
          deletedProducts.map((product) => deleteProduct(product._id!))
        )
      ),
      successToast: {
        message: `${
          productsToDelete.length > 1 ? 'Products' : 'Product'
        } deleted successfully`,
        type: 'SUCCESS',
      },
      errorToast: () => `Failed to delete ${
        productsToDelete.length > 1 ? 'Products' : 'Product'
      }`,
    });
  }, [optimisticActions, deleteProduct]);
}
