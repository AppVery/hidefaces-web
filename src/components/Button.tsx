import React from 'react';

const getButtonClasses = (isPrimary: boolean): string => {
  const primaryColor = 'yellow';
  const secondaryColor = 'indigo';
  const primary = `bg-${primaryColor}-500`;
  const secondary = `bg-${secondaryColor}-600`;

  const common = `inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-${secondaryColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${secondaryColor}-500 sm:w-auto sm:text-sm`;

  return `${isPrimary ? primary : secondary} ${common}`;
};

export const SubmitButton: React.FC<{
  text: string;
  fn: (e: React.FormEvent<HTMLInputElement>) => void;
}> = ({ text, fn }) => {
  return (
    <input
      type="submit"
      className={`${getButtonClasses(true)} cursor-pointer`}
      onClick={fn}
      value={text}
    />
  );
};

const Button: React.FC<{
  text: string;
  fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPrimary?: boolean;
}> = ({ text, fn, isPrimary = false }) => {
  return (
    <button type="button" className={getButtonClasses(isPrimary)} onClick={fn}>
      {text}
    </button>
  );
};

export default Button;
