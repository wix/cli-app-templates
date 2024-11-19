import { APP_ID } from "../consts";

const LOCALE = "en-US";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (currency: string, currencyString: number) => {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(currencyString);
};

export const getPricingPageURL = (instanceId: string) =>
  `https://www.wix.com/apps/upgrade/${APP_ID}?appInstanceId=${instanceId}`;
