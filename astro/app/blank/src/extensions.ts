import { app } from '@wix/astro/builders';
import * as extensions from '@wix/astro/builders';

export default app()
  .use(
    extensions.backofficePage({
      id: '<%= generatePageID() %>',
      component: './extensions/my-page/page.tsx',
      routePath: 'my-page',
      title: 'My Page',
    })
  );
