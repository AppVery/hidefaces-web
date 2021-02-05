import React from 'react';
import IconList from '../components/IconList';
import ImageMosaic from '../components/ImageMosaic';
import CtaButton from '../components/CtaButton';
import mainImage from '../svg/sides.svg';
import { mainContent } from '../content/main';

const { button, mainCta, secondaryCta } = mainContent;

const Content: React.FC<{ scroll: () => void }> = ({ scroll }) => {
  return (
    <>
      <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 lg:text-center">
        <header>
          <h1 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            {mainCta.title}
          </h1>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {mainCta.subtitle}
          </p>
          <h2 className="my-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{mainCta.text}</h2>
          <CtaButton text={button} onClick={scroll} />
        </header>
        <div className="my-20 mx-2">
          <img
            className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
            src={mainImage}
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 lg:text-center">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
            <header>
              <h2 className="text-base leading-6 text-indigo-500 font-semibold uppercase">
                {secondaryCta.title}
              </h2>
              <p className="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                {secondaryCta.subtitle}
              </p>
              <h3 className="my-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                {secondaryCta.text}
              </h3>
              <CtaButton text={button} onClick={scroll} />
            </header>
            <IconList />
          </div>
          <aside className="mt-14 lg:-mx-4 lg:mt-0 lg:col-start-1">
            <div className="space-y-6">
              <ImageMosaic />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Content;
