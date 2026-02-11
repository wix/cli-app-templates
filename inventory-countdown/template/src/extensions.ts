import { app } from '@wix/astro/builders';
import stockCounter from './extensions/site/plugins/stock-counter/stock-counter.extension.ts';

export default app()
  .use(stockCounter)
