import React, { useEffect, useMemo, useState } from 'react';
import { Input, Button, Box, Loader } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import { useEmbeds } from '../hooks/wix-embeds.js';

type MixpanelEmbeds = {
  projectToken: string;
};

export default function ProjectToken() {
  const { injectEmbeds, queryEmbeds } = useEmbeds<MixpanelEmbeds>();
  const [projectToken, setProjectToken] = useState<string>('');

  useEffect(() => {
    setProjectToken(queryEmbeds.data?.projectToken || '');
  }, [queryEmbeds.data]);

  const ButtonContent = () => {
    if (injectEmbeds.isLoading) {
      return <Loader size="tiny" />;
    }

    if (!queryEmbeds.data?.projectToken) {
      return (
        <Box gap={1}>
          Activate
          <Icons.GetStarted />
        </Box>
      );
    } else {
      return <>Update</>;
    }
  };

  return (
    <Box gap={3} marginTop={3}>
      {queryEmbeds.isLoading ? (
        <Loader size="small" />
      ) : (
        <>
          <Input
            disabled={injectEmbeds.isLoading}
            placeholder={'project-token'}
            value={projectToken}
            onChange={(e) => setProjectToken(e.currentTarget.value)}
          />
          <Button
            disabled={
              queryEmbeds.data?.projectToken === projectToken ||
              projectToken.length !== 32
            }
            onClick={() => injectEmbeds.mutate({ projectToken })}
          >
            <ButtonContent />
          </Button>
        </>
      )}
    </Box>
  );
}
