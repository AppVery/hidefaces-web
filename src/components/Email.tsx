import React from 'react';
import { emailContent } from '../content/steps';

const Email: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ email, setEmail }) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  return (
    <div className="col-span-3 sm:col-span-2">
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={onChange}
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
