import React, { useEffect, useState } from 'react';
import { Input, Button, Box, Loader } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import { useEmbeds } from '../hooks/wix-embeds.js';

type MixpanelEmbeds = {
  projectToken: string;
};

export default function ProjectToken() {
  const { embedScript, getEmbeddedScript } = useEmbeds<MixpanelEmbeds>();
  const [projectToken, setProjectToken] = useState<string>('');

  useEffect(() => {
    setProjectToken(getEmbeddedScript.data?.projectToken || '');
  }, [getEmbeddedScript.data]);

  const ButtonContent = () => {
    if (embedScript.isLoading) {
      return <Loader size="tiny" />;
    }

    if (!getEmbeddedScript.data?.projectToken) {
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
      {getEmbeddedScript.isLoading ? (
        <Loader size="small" />
      ) : (
        <>
          <Input
            disabled={embedScript.isLoading}
            placeholder={'project-token'}
            value={projectToken}
            onChange={(e) => setProjectToken(e.currentTarget.value)}
          />
          <Button
            disabled={
              getEmbeddedScript.data?.projectToken === projectToken ||
              projectToken.length !== 32
            }
            onClick={() => embedScript.mutate({ projectToken })}
          >
            <ButtonContent />
          </Button>
        </>
      )}
    </Box>
  );
}
