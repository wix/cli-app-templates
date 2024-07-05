import React, { type FC } from 'react';
import { CloseButton } from '../close-button.js';
import { SitePopupOptions } from '../../types.js';
import './index.css';

function formatDateWithLocale(dateInMillis: string, locale: string) {
  const date = new Date(Number(dateInMillis));
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(date);
}

export const Popup: FC<
  SitePopupOptions & {
  locale: string;
  onClose?: (hideForever?: boolean) => void;
}
> = ({
       headline,
       text,
       imageUrl,
       imageTitle,
       onClose,
       startDate,
       endDate,
       locale,
     }) => {
  let formattedText = text;
  if (startDate) {
    formattedText = formattedText.replace(/{startDate}/g, formatDateWithLocale(startDate, locale));
  }
  if (endDate) {
    formattedText = formattedText.replace(/{endDate}/g, formatDateWithLocale(endDate, locale));
  }
  return (
    <div className="rounded-lg shadow-2xl grid md:grid md:grid-cols-2">
      <div id="close-btn" className="absolute z-[1000]">
        <CloseButton onClick={() => onClose?.()} />
      </div>
      <div className="p-4 text-center sm:p-6 md:col-span-1 lg:p-8 bg-gray-800 flex flex-col justify-between rounded-l-lg">
        <div className="relative bottom-0 isolate overflow-hidden px-4 py-24 sm:px-12 xl:py-32">
          <h4 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl text-white">
            {headline}
          </h4>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            {formattedText}
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <button
            type="button"
            className="flex-bottom text-sm text-white hover:underline"
            onClick={() => onClose?.(true)}
          >
            Don't show this again
          </button>
        </div>
      </div>
      <img
        width="50vw"
        height="50vh"
        src={imageUrl}
        alt={imageTitle}
        className="h-64 object-cover w-full md:h-full rounded-r-lg"
      />
    </div>
  );
};
