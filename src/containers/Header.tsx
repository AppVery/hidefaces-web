import React, { useState, useEffect } from 'react';
import logo from '../svg/logo.svg';
import appIcon from '../svg/app.svg';

// eslint-disable-next-line
let deferredPrompt: any;

const Header: React.FC = () => {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    setInstallable(false);
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
  };

  return (
    <header>
      <div className="flex justify-around bg-indigo-800 text-white">
        <div className="w-2/4 flex items-center flex-shrink-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img className="h-12 w-12" src={logo} alt="HideFaces Logo" />
          <p className="text-white px-3 py-2 rounded-md text-3xl font-medium">HideFaces</p>
        </div>
        <div className="w-2/4 flex justify-end items-center px-5">
          {installable && (
            <button className="install-button" onClick={handleInstallClick}>
              <img className="h-10 w-10" src={appIcon} alt="Install App" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
