import React, { useState } from 'react';
import {
  Button,
  Modal,
  CustomModalLayout,
  FormField,
  Input,
  Loader,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import { useCreateProduct } from '../hooks/stores';

export function CreateProduct() {
  const createProduct = useCreateProduct();
  const [productName, setProductName] = useState('');
  const [shown, setShown] = useState(false);

  const toggleModal = () => {
    setShown(!shown);
    setProductName('');
  };

  return (
    <>
      <Button prefixIcon={<Icons.Add />} onClick={toggleModal}>
        Add Product
      </Button>
      <Modal
        isOpen={shown}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick
        screen="desktop"
      >
        <CustomModalLayout
          title="Create Product"
          primaryButtonProps={{
            disabled: createProduct.isLoading || !productName,
            children: createProduct.isLoading ? <Loader size="tiny" /> : 'Save',
          }}
          primaryButtonOnClick={async () => {
            await createProduct.mutateAsync({ product: { name: productName } });
            toggleModal();
          }}
          secondaryButtonText="Cancel"
          secondaryButtonOnClick={toggleModal}
          onCloseButtonClick={toggleModal}
          content={
            <FormField label="Name">
              <Input
                value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
              />
            </FormField>
          }
        />
      </Modal>
    </>
  );
}
