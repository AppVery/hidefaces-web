import React from 'react';

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
        This email is not saved anywhere. We won’t send you any emails other than the link to
        download the new video from our servers in AWS. For further details, review our Privacy
        Policy.
      </label>
    </div>
  );
};

export default Email;
