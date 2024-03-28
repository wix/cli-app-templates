import React, { type FC } from 'react';

interface Props {
  onClick?: () => void;
}

export const CloseButton: FC<Props> = ({ onClick }) => {
  return (
    <div className="flex justify-end p-2">
      <button
        onClick={onClick}
        type="button"
        className="bg-transparent bg-gray-200 text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
