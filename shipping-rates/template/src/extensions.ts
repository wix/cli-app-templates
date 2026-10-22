import { app } from '@wix/astro/builders';
import shippingRatesPage from './extensions/dashboard/pages/shipping-rates/shipping-rates.extension.ts';
import activateModal from './extensions/dashboard/modals/activate-shipping-rates-plugin/modal.extension.ts';
import shippingRatesPlugin from './extensions/backend/service-plugins/ecom-shipping-rates/shipping-rates.extension.ts';

export default app().use(shippingRatesPage).use(activateModal).use(shippingRatesPlugin);
