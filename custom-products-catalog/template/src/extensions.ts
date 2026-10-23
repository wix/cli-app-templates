import { app } from '@wix/custom-extensions';
import catalog from './extensions/dashboard/pages/catalog/catalog.extension.ts';

export default app().use(catalog);
