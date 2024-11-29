import { i18n } from "@wix/essentials";

export function formatDate(date: Date) {
  return date.toLocaleDateString(i18n.getLocale(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}