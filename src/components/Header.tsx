import React from 'react';
import logo from '../svg/logo.svg';

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-indigo-800">
        <div className="flex items-center flex-shrink-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img className="h-12 w-12" src={logo} alt="HideFaces Logo" />
          <p className="text-white px-3 py-2 rounded-md text-3xl font-medium">HideFaces</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
