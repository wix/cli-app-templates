import { products } from '@wix/stores';
import { useCallback } from 'react';
import { CollectionOptimisticActions } from '@wix/patterns';

export function useCreateProduct(optimisticActions: CollectionOptimisticActions<products.Product, {}>) {
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
    
    // Set optimistic actions for product creation.
    optimisticActions.createOne(newProduct, {
      submit: async ([product]: products.Product[]) => {
        // Call the createProduct() API.
        const response = await products.createProduct(product);
        return response.product ? [response.product] : [];
      },
      successToast: {
        message: `${newProduct.name} was successfully created`,
        type: 'SUCCESS',
      },
      errorToast: () => 'Failed to create product',
    })
  }, [optimisticActions]);

}

export function useDeleteProducts(optimisticActions: CollectionOptimisticActions<products.Product, {}>) {
  return useCallback((productsToDelete: products.Product[] ) => {
   
    // Set optimistic actions for product deletion.
    optimisticActions.deleteMany(productsToDelete, {
      submit: async (deletedProducts: products.Product[]) => (
        await Promise.all(
        // Call the deleteProduct() API.
          deletedProducts.map((product) => products.deleteProduct(product._id!))
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
  }, [optimisticActions]);
}
