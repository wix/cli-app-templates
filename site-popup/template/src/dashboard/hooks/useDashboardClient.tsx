import { SDK, dashboard } from '@wix/dashboard';
import { createClient } from '@wix/sdk';

export const useDashboardClient = (): SDK => {
  const client = createClient({
    host: dashboard.host(),
    auth: dashboard.auth(),
    modules: {
      dashboard,
    },
  });
  return client.dashboard;
};
