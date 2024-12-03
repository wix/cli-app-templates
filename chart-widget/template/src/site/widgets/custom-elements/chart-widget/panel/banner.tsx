import { Box, Text, Button, SectionHelper, SectionHelperAppearance, ButtonSkin } from '@wix/design-system';
import React from 'react';

export interface BannerProps {
  appearance?: SectionHelperAppearance;
  title: string;
  description: string;
  action?: string;
  actionSkin?: ButtonSkin;
  onActionClick?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  appearance,
  title,
  description,
  action,
  actionSkin,
  onActionClick
}) => {
  return (
    <Box padding="SP2">
      <SectionHelper
        fullWidth
        title={title}
        appearance={appearance}
      >
        <Box gap="SP2" direction="vertical">
          <Text size="small">{description}</Text>
          {action && (
            <Button
              size="small"
              skin={actionSkin}
              onClick={onActionClick}
              children={action}
            />
          )}
        </Box>
      </SectionHelper>
    </Box>
  )
}
