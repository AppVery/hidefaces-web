import React from 'react';
import { legalContent } from '../content/legal';
import logo from '../svg/logo.svg';

const { email, linkText } = legalContent;

const Footer: React.FC<{
  fn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ fn }) => {
  return (
    <footer>
      <div className="flex justify-around bg-indigo-800 text-white">
        <div className="w-2/4 flex items-center flex-shrink-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img className="h-12 w-12" src={logo} alt="HideFaces Logo" />
          <p className="px-3 py-2 rounded-md">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="w-2/4 flex justify-end items-center px-10">
          <button onClick={fn}>{linkText}</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
