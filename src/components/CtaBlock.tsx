import React from 'react';
import Button from '../components/Button';

type props = {
  isMain?: boolean;
  data: {
    title: string;
    subtitle: string;
    text: string;
    button: string;
    fn: () => void;
  };
};

const CtaBlock: React.FC<props> = ({ data, isMain = false }) => {
  const { title, subtitle, text, button, fn } = data;
  const Heading1 = isMain ? 'h1' : 'h2';
  const Heading2 = isMain ? 'h2' : 'h3';

  return (
    <>
      <Heading1 className="text-base text-indigo-600 leading-6 font-semibold tracking-wide uppercase">
        {title}
      </Heading1>
      <p
        className={`${
          isMain ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
        } mt-2 leading-10 font-extrabold tracking-tight text-gray-900 sm:leading-9`}
      >
        {subtitle}
      </p>
      <Heading2
        className={`${
          isMain ? 'text-xl' : 'text-lg'
        } my-4 max-w-2xl leading-8 text-gray-500 lg:mx-auto`}
      >
        {text}
      </Heading2>
      <Button text={button} fn={fn} isPrimary={true} />
    </>
  );
};

export default CtaBlock;
