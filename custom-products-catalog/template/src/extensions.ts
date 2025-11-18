import { app } from '@wix/astro/builders';
import chartWidget from './extensions/site/widgets/chart-widget/chart-widget.extension.ts';

export default app()
  .use(chartWidget)
