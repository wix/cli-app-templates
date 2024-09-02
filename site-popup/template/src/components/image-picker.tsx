import React, { type FC } from 'react';
import { Box, Input, TextButton } from '@wix/design-system';
import { dashboard } from '@wix/dashboard';
import * as Icons from '@wix/wix-ui-icons-common';

interface Props {
  imageUrl: string;
  imageTitle: string;
  onChange: (imageUrl: string, imageTitle: string) => void;
}

export const ImagePicker: FC<Props> = ({ onChange, imageTitle }) => {
  return (
    <Box gap={3} verticalAlign="middle" marginTop={1}>
      <Input value={imageTitle} disabled />
      <TextButton
        prefixIcon={<Icons.Edit />}
        onClick={() =>
          dashboard.openMediaManager().then((response) => {
            if (response?.items[0]) {
              onChange(
                response?.items[0].url || '',
                response?.items[0].displayName || ''
              );
            }
          })
        }
      >
        Change image
      </TextButton>
    </Box>
  );
};
