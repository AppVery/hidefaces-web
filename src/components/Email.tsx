import React from 'react';
import { emailContent } from '../content/steps';

const Email: React.FC = () => {
  return (
    <div className="col-span-3 sm:col-span-2">
      <input
        type="text"
        name="email"
        id="email"
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
        placeholder="myname@gmail.com"
      />
      <label htmlFor="email" className="mt-4 block text-xs text-gray-400">
        {emailContent.note}
      </label>
    </div>
  );
};

export default Email;
