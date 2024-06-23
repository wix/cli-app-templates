import { dashboard } from "@wix/dashboard";
import { createClient } from '@wix/sdk';

export const useDashboardSdk = () => {
  const client = createClient({
    host: dashboard.host(),
    auth: dashboard.auth(),
    modules: {
      dashboard,
    },
  });
  return client.dashboard;
};
