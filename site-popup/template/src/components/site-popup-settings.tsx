import React, { type FC } from 'react';
import {
  Input,
  Text,
  Box,
  InputArea,
  Card,
  FormField,
  FormFieldProps,
} from '@wix/design-system';
import { SitePopupOptions } from '../types';
import { ActivationConfiguration } from './activation-configuration';
import { ImagePicker } from './image-picker';
import { SubscriptionBanner } from './subscription-banner';
import { useAppInstance } from '../hooks/instance';

interface Props {
  options: SitePopupOptions;
  onChange: (options: SitePopupOptions) => void;
}

export const SitePopupSettings: FC<Props> = ({ options, onChange }) => {
  const { data: appInstance } = useAppInstance();
  
  const getFieldStatus = (
    field: keyof SitePopupOptions
  ): Partial<FormFieldProps> => {
    return !options[field]
      ? {
          status: 'error',
          statusMessage: 'Required.',
        }
      : {};
  };

  return (
    <Box direction="vertical">
      <Box gap={10} direction="vertical">
        <Card>
          <Card.Header
            title="Settings"
            subtitle={
              <Box direction="horizontal">
                <Text secondary>Customize your site popup appearance.</Text>
              </Box>
            }
          />
          <Card.Divider />
          <Card.Content>
            <Box gap={3} direction="horizontal">
              <Box gap={3} direction="vertical" width={'50%'}>
                <FormField
                  labelSize="small"
                  label="Headline"
                  {...getFieldStatus('headline')}
                >
                  <Input
                    disabled={appInstance?.isFree}
                    placeholder="Sale 20% Off"
                    value={options?.headline}
                    onChange={(e) =>
                      onChange({
                        ...options,
                        headline: e.currentTarget.value,
                      })
                    }
                  />
                </FormField>
                <FormField
                  labelSize="small"
                  label="Text"
                  infoContent={
                    options.activationMode == 'timed'
                      ? 'Include the placeholders {startDate} and {endDate} to show the start and end dates, formatted according to the site\'s regional settings.'
                      : undefined
                  }
                  {...getFieldStatus('text')}
                >
                  <InputArea
                    disabled={appInstance?.isFree}
                    placeholder="Sign up and get 20% off on our Winter Sale"
                    value={options?.text}
                    onChange={(e) =>
                      onChange({
                        ...options,
                        text: e.currentTarget.value,
                      })
                    }
                  />
                </FormField>
                <FormField labelSize="small" label="Popup Activation">
                  <ActivationConfiguration
                    disabled={appInstance?.isFree}
                    activationOptions={{
                      activationMode: options.activationMode,
                      startDate: options.startDate,
                      endDate: options.endDate,
                    }}
                    onChange={(activationOptions) =>
                      onChange({
                        ...options,
                        ...activationOptions,
                      })
                    }
                  />
                </FormField>
                <FormField labelSize="small" label="Popup Image">
                  <ImagePicker
                    disabled={appInstance?.isFree}
                    imageTitle={options.imageTitle}
                    imageUrl={options.imageUrl}
                    onChange={(imageUrl, imageTitle) =>
                      onChange({
                        ...options,
                        imageUrl,
                        imageTitle,
                      })
                    }
                  />
                </FormField>
              </Box>
              <Box gap={3} direction="vertical" width="50%">
                <SubscriptionBanner />
              </Box>
            </Box>
          </Card.Content>
        </Card>
      </Box>
    </Box>
  );
};
