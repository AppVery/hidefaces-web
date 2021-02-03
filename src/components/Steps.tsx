import React, { useState } from 'react';
import Modal from './Modal';
import Bar from './items/Bar';
import CtaButton from './items/CtaButton';

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [isModal, showModal] = useState(false);
  return (
    <section className="bg-gray-200 py-10 mt-10">
      {isModal && <Modal fn={() => showModal(false)} />}
      <Bar />
      <section ref={startRef}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:p/x-8">
          <h3 className="text-2xl leading-6 text-indigo-500 font-semibold uppercase">Step 1</h3>
          <div className="px-4 py-6 sm:px-0 ">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-indigo-900">Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label className="block text-sm font-medium text-indigo-700">
                          Cover photo
                        </label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                      <CtaButton text="dev" onClick={() => showModal(true)} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Setps;
