import React from 'react';
import loaderIcon from '../svg/loader.svg';
import warnIcon from '../svg/warn.svg';
import checkIcon from '../svg/check.svg';

const Modal: React.FC<{
  data: { error: boolean; title: string; html: string; loading?: boolean };
  fn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ data, fn }) => {
  const { error, title, html, loading } = data;
  const iconColor = error ? 'yellow' : 'green';

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
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${iconColor}-100 sm:mx-0 sm:h-12 sm:w-12`}
              >
                <span className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full p-1.5">
                  <img className="h-12 w-12" src={error ? warnIcon : checkIcon} alt="Modal Icon" />
                </span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {title}
                </h3>
                <div className="mt-2">
                  <div
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: html }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {loading ? (
              <div className="w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm">
                <span className="loading rounded-full bg-yellow-500">
                  <img className="h-10 w-10" src={loaderIcon} alt="Loading video" />
                </span>
              </div>
            ) : (
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={fn}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
