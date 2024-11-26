import React from 'react';
import { Page, Card, Box, Text, TextButton } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withProviders } from '../withProviders';
import ProjectToken from '../components/ProjectToken.js';

function MixpanelAnalytics() {
  return (
    <Page height="100vh">
      <Page.Header title="Mixpanel Analytics" />
      <Page.Content>
        <Card>
          <Card.Header title="Setup" />
          <Card.Divider />
          <Card.Content>
            <Box direction="vertical" gap={3}>
              <Text>
                To start collecting data please add your Mixpanel project token.
                <br />
                If you don't have one, you can create it in
                <Box inline padding={1}>
                  <TextButton
                    underline="onHover"
                    onClick={() => open('https://mixpanel.com/analysis')}
                  >
                    Mixpanel Analytics
                  </TextButton>
                </Box>
              </Text>
              <ProjectToken />
            </Box>
          </Card.Content>
        </Card>
      </Page.Content>
    </Page>
  );
}

export default withProviders(MixpanelAnalytics);
