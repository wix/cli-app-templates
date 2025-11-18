import { app } from '@wix/astro/builders';
import settingsPage from './extensions/dashboard/pages/settings/settings.extension.ts';
import popupScript from './extensions/site/embedded-scripts/popup/popup.extension.ts';

export default app()
  .use(settingsPage)
  .use(popupScript)
