import { app } from '@wix/astro/builders';
import mixpanelAnalytics from './extensions/site/embedded-scripts/analytics/analytics.extension.ts';

export default app()
  .use(mixpanelAnalytics)
