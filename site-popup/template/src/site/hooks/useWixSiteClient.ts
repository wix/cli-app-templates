import { useMemo } from 'react';
import { createClient } from '@wix/sdk';
import { site as siteSdk } from '@wix/site';
import { site } from '@wix/site-site';
import { appId } from '../../../wix.config.json';

export const useWixSiteClient = () => {
  const sdk = useMemo(() => {
    return createClient({
      host: siteSdk.host({ applicationId: appId }),
      modules: { site },
    });
  }, []);
  return sdk;
};
