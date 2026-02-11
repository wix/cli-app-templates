import { app } from '@wix/astro/builders';
import catalog from './extensions/dashboard/pages/catalog/catalog.extension.ts';

export default app()
  .use(catalog)
