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
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 lg:text-center">
        <h1 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
          Hide Faces In Videos Automatically
        </h1>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to share videos
        </p>
        <h2 className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          You can now easily blur faces to protect the privacy of all people
        </h2>
      </div>
    </header>
  );
};

export default Header;
