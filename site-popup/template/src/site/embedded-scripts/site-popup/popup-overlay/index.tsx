import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Popup } from '../../../../components/popup/index.js';
import { SitePopupOptions } from '../../../../types.js';
import './index.css';
import { site } from '@wix/site-site';

const PopupOverlay = () => {
  const [shown, setShown] = useState<boolean>(false);
  const el = document.querySelector('#popup-data') as HTMLElement;
  const popupParams = el?.dataset as SitePopupOptions;

  const [regionalSettings, setRegionalSettings] = useState<string>('en-us');

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

ReactDOM.render(<PopupOverlay />, document.getElementById('site-popup'));
