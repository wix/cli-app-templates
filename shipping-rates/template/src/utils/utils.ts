import { i18n } from "@wix/essentials";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(i18n.getLocale(), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (currency: string, currencyString: number) => {
  return new Intl.NumberFormat(i18n.getLocale(), {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(currencyString);
};
