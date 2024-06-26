import React, { useEffect, useState } from 'react';
import { Box, Button, Cell, Layout, Loader, Page } from '@wix/design-system';
import { useEnvironment } from '@wix/sdk-react';
import { EnvironmentState } from '@wix/dashboard';
import '@wix/design-system/styles.global.css';
import { withProviders } from '../withProviders';
import { SitePopupSettings } from '../../components/site-popup-settings.js';
import { SitePopupOptions } from '../../types.js';
import { useEmbeds } from '../hooks/wix-embeds.js';
import { Popup } from '../../components/popup/index.js';

const sitePopupDefaultOptions: SitePopupOptions = {
  headline: 'Sale 20% Off',
  text: 'Sign up and get 20% off on our Winter Sale',
  imageUrl:
    'https://static.wixstatic.com/media/11062b_db81bbf678b641ff9e00b768cb155a49~mv2.jpg',
  imageTitle: 'Clothes For Sale',
  activationMode: 'active',
};

function SitePopup() {
  const { embedScript, getEmbeddedScript } =
    useEmbeds<Partial<SitePopupOptions>>();

  const [sitePopupOptions, setSitePopupOptions] = useState<SitePopupOptions>(
    sitePopupDefaultOptions
  );

  const { locale } = useEnvironment<EnvironmentState>();

  useEffect(() => {
    setSitePopupOptions((prevOptions) => ({
      ...prevOptions,
      ...getEmbeddedScript.data,
      imageUrl: (
        getEmbeddedScript.data?.imageUrl || prevOptions.imageUrl
      ).replace(/\\/g, ''),
    }));
  }, [getEmbeddedScript.data]);

  return (
    <Page height="100vh">
      <Page.Header
        title="Site Popup"
        subtitle="Configure site popup setting & preview as it will appear on your site."
        actionsBar={
          <Button
            skin="inverted"
            disabled={!sitePopupOptions.headline || !sitePopupOptions.text}
            onClick={() => embedScript.mutate({ ...sitePopupOptions })}
          >
            {embedScript.isLoading ? <Loader size="tiny" /> : 'Save'}
          </Button>
        }
      />
      <Page.Content>
        {getEmbeddedScript.isLoading ? (
          <Box align="center" verticalAlign="middle" height="50vh">
            <Loader text="Loading..." />
          </Box>
        ) : (
          <Layout>
            <Cell>
              <SitePopupSettings
                options={sitePopupOptions}
                onChange={(options) => setSitePopupOptions(options)}
              />
            </Cell>
            <Cell>
              <Popup {...sitePopupOptions} locale={locale} />
            </Cell>
          </Layout>
        )}
      </Page.Content>
    </Page>
  );
}

export default withProviders(SitePopup);
