import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Popup } from '../../../../components/popup/index.js';
import { SitePopupOptions } from '../../../../types.js';
import './index.css';
import { site } from '@wix/site-site';
import { useAppInstance } from '../../../../hooks/instance.js';

const PopupOverlay = () => {
  const el = document.querySelector('#popup-data') as HTMLElement;
  const popupParams = el?.dataset as SitePopupOptions;
  
  const [shown, setShown] = useState<boolean>(false);
  const [regionalSettings, setRegionalSettings] = useState<string>('en-us');
  
  const { data: appInstance, isLoading } = useAppInstance();

  useEffect(() => {
    site.regionalSettings().then(setRegionalSettings);
  }, []);

  useEffect(() => {
    const isPopupShownStorage = localStorage.getItem('isPopupShown');
    setShown(isPopupShownStorage !== 'false');
  }, []);

  const closePopup = (hideForever?: boolean) => {
    setShown(false);
    if (hideForever) {
      localStorage.setItem('isPopupShown', 'false');
    }
  };

  const shouldShowPopup = () => {
    if (popupParams.activationMode === 'timed') {
      return (
        Date.now() > new Date(Number(popupParams.startDate)).getTime() &&
        Date.now() < new Date(Number(popupParams.endDate)).getTime()
      );
    } else if (popupParams.activationMode === 'active') {
      return true;
    }
    return false;
  };

  if (isLoading || appInstance?.isFree) {
    return null;
  }

  return (
    <div
      className={
        shown && shouldShowPopup()
          ? 'fixed flex justify-center items-center inset-0 z-[1000] bg-gray-300 bg-opacity-75'
          : 'hidden'
      }
    >
      <div className="w-9/12">
        <Popup {...popupParams} locale={regionalSettings} onClose={closePopup} />
      </div>
    </div>
  );
};

ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <PopupOverlay />
  </QueryClientProvider>,
  document.getElementById('site-popup')
);
