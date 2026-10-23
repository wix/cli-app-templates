import { app } from '@wix/custom-extensions';
import chartWidget from './extensions/site/widgets/chart-widget/chart-widget.extension.ts';

export default app().use(chartWidget);
