import React from 'react';
import Button from '../components/Button';
import { legalContent } from '../content/legal';
import icon from '../svg/info.svg';

const { title, html } = legalContent;

const CloseBar: React.FC<{
  fn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ fn }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <Button text="Close" fn={fn} />
    </div>
  );
};

const Legal: React.FC<{
  fn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ fn }) => {
  return (
    <aside className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-3xl w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <CloseBar fn={fn} />
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-200 sm:mx-0 sm:h-12 sm:w-12`}
              >
                <span className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full p-1.5">
                  <img className="h-12 w-12" src={icon} alt="Legal Icon" />
                </span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {title}
                </h3>
                <div className="mt-2 pr-4 overflow-y-scroll h-screen">
                  <div
                    className="legal text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: html }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <CloseBar fn={fn} />
        </div>
      </div>
    </aside>
  );
};

export default Legal;
