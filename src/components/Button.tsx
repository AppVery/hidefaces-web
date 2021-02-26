import React from 'react';

const primaryColor = 'yellow';
const secondaryColor = 'indigo';
const primaryClasses = `bg-${primaryColor}-500`;
const secondaryClasses = `bg-${secondaryColor}-600`;
const commonClasses = `inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  hover:bg-${secondaryColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${secondaryColor}-500 sm:w-auto sm:text-sm`;

const Button: React.FC<{
  text: string;
  fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPrimary?: boolean;
}> = ({ text, fn, isPrimary = false }) => {
  return (
    <button
      type="button"
      className={`${isPrimary ? primaryClasses : secondaryClasses} ${commonClasses} `}
      onClick={fn}
    >
      {text}
    </button>
  );
};

export default Button;
