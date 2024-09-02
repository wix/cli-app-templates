import React, { useEffect, useState } from 'react';
import {
  Modal,
  CustomModalLayout,
  FormField,
  Input,
} from '@wix/design-system';

export function CreateProductModal({ showModal, onSave }: { showModal: boolean, onSave: (name: string) => void }) {
  const [productName, setProductName] = useState('');
  const [shown, setShown] = useState(showModal);

  useEffect(() => {
    setShown(showModal);
  }, [showModal])


  const toggleModal = () => {
    setShown(!shown);
    setProductName('');
  };

  return (
    <Modal
      isOpen={shown}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick
      screen="desktop"
    >
      <CustomModalLayout
        title="Create Product"
        primaryButtonProps={{
          disabled: !productName,
          children: 'Save',
        }}
        primaryButtonOnClick={() => {
          onSave(productName)
          setProductName('')
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
  );
}
