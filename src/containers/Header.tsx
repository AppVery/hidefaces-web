import React from 'react';
import { useInstallApp } from '../hooks/useInstallApp';
import logo from '../svg/logo.svg';
import installIcon from '../svg/install.svg';
import { brand } from '../content/main';

const Header: React.FC = () => {
  const [isInstallable, installApp] = useInstallApp();

  return (
    <header>
      <div className="flex justify-around bg-indigo-800 text-white">
        <div className="w-2/4 flex items-center flex-shrink-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img className="h-12 w-12" src={logo} alt="HideFaces Logo" />
          <p className="text-white px-3 py-2 rounded-md text-3xl font-medium">{brand}</p>
        </div>
        <div className="w-2/4 flex justify-end items-center px-5">
          {isInstallable && (
            <button className="install-button" onClick={installApp}>
              <img className="h-10 w-10" src={installIcon} alt="Install App" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
