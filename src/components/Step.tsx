import React from 'react';

type props = {
  content: { title: string; subtitle: string; description: string };
  border?: boolean;
};

const Step: React.FC<props> = ({ content, border = true, children }) => {
  const { title, subtitle, description } = content;
  const borderClass = border ? 'border-t-2 border-white' : '';
  return (
    <section className={`max-w-7xl mx-auto sm:px-6 lg:p/x-8 ${borderClass}`}>
      <div className="px-4 py-6 sm:px-0 ">
        <div className="md:grid md:grid-cols-4 md:gap-6">
          <div className="md:col-span-2">
            <p className="text-1xl leading-6 text-indigo-500 font-semibold uppercase mb-4">
              {title}
            </p>
            <h3 className="text-lg font-medium leading-6 text-indigo-900">{subtitle}</h3>
            <p className="mt-1 text-sm text-gray-600 max-w-sm">{description}</p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
