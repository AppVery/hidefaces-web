import React from 'react';

const CtaButton: React.FC<{
  text: string;
  onClick: (e: React.FormEvent<HTMLInputElement>) => void;
}> = ({ text, onClick }) => {
  return (
    <input
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      onClick={onClick}
      value={text}
    />
  );
};

export default CtaButton;
