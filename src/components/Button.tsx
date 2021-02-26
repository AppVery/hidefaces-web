import React from 'react';

const Button: React.FC<{
  text: string;
  fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ text, fn }) => {
  return (
    <button
      type="button"
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={fn}
    >
      {text}
    </button>
  );
};

export default Button;
