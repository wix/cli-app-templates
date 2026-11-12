import { app } from '@wix/custom-extensions';
import myPage from './extensions/dashboard/pages/my-page/my-page.extension.ts';

export default app().use(myPage);
