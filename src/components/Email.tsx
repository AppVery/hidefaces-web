import React, { useState } from 'react';
import { emailContent } from '../content/steps';

const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
);

const Email: React.FC<{
  confirmEmail: React.Dispatch<React.SetStateAction<string>>;
  fn: () => void;
}> = ({ confirmEmail, fn: openLegalModal }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError('');
    setEmail(e.currentTarget.value);
  };

  const onLosesFocus = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    if (!emailPattern.test(input)) {
      setError(emailContent.error);
      confirmEmail('');
    } else {
      setError('');
      confirmEmail(input);
    }
  };

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openLegalModal();
  };

  return (
    <div className="col-span-3 sm:col-span-2">
      <label className="mb-2 block text-ms text-red-400">{error}</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={onChange}
        onBlur={onLosesFocus}
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
        placeholder="myname@gmail.com"
      />
      <label htmlFor="email" className="mt-4 block text-xs text-gray-400">
        {emailContent.note}
        <button onClick={handlerClick} className="font-black underline">
          {emailContent.link}
        </button>
      </label>
    </div>
  );
};

export default Email;
