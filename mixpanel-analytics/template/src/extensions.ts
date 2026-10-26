import { app } from '@wix/custom-extensions';
import mixpanelAnalytics from './extensions/site/embedded-scripts/analytics/analytics.extension.ts';
import setupPage from './extensions/dashboard/pages/setup/setup.extension.ts';

export default app().use(setupPage).use(mixpanelAnalytics);
