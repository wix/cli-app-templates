import { products } from '@wix/stores';
import { useWixModules } from '@wix/sdk-react';
import { useCallback } from "react";
import { CollectionOptimisticActions } from '@wix/patterns';

export function useCreateProduct(optimisticActions: CollectionOptimisticActions<Product.product>) {
  const {createProduct} = useWixModules(products);

  return useCallback((productName: string) => {
    const newProduct = {
      id: window.Date().toString(),
      name: productName,
      createdDate: new window.Date(),
      productType: 'physical',
      description: 'New Product Description',
      priceData: {
        currency: 'USD',
        price: 10,
      },
    };
    optimisticActions.createOne(newProduct, {
      submit: async (products) => {
        const response = await createProduct(products[0]);
        return [response.product];
      },
      successToast: {
        message: `${newProduct.name} was successfully created`,
        type: 'SUCCESS',
      },
      errorToast: () => 'Failed to create product',
    })
  }, [optimisticActions, createProduct]);

}

export function useDeleteProducts(optimisticActions: CollectionOptimisticActions<Product.product>) {
  const {deleteProduct} = useWixModules(products);

  return useCallback(({products}: { products: Products.product[] }) => {
    optimisticActions.deleteMany(products, {
      submit: async (productsToDelete) => {
        await Promise.all(
          productsToDelete.map((product) => deleteProduct(product._id))
        )
      },
      successToast: {
        message: `${
          products.size > 1 ? 'Products' : 'Product'
        } deleted successfully`,
        type: 'SUCCESS',
      },
      errorToast: () => `Failed to delete ${
        products.size > 1 ? 'Products' : 'Product'
      }`,
    });
  }, [optimisticActions, deleteProduct]);
}
