import React, { useState } from 'react';
import Stripe from './Stripe';

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [isModal, showModal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);

  const openModal = () => {
    const offset = window.scrollY;
    setWindowOffset(offset);
    document.body.setAttribute('style', `position: fixed; top: -${offset}px; left:0: right; 0;`);
    showModal(true);
  };
  const closeModal = () => {
    document.body.setAttribute('style', '');
    window.scrollTo(0, windowOffset);
    showModal(false);
  };

  return (
    <section className="bg-gray-200 py-2 mt-10">
      <form action="#">
        <section ref={startRef}>
          <div className="max-w-7xl mx-auto sm:px-6 lg:p/x-8">
            <div className="px-4 py-6 sm:px-0 ">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-2">
                  <p className="text-1xl leading-6 text-indigo-500 font-semibold uppercase mb-4">
                    Step 1
                  </p>
                  <h3 className="text-lg font-medium leading-6 text-indigo-900">
                    Choose your video
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 max-w-sm">
                    You can upload a video with a maximum length of 60 seconds, which will be
                    deleted at the end of the process.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
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
                          <p className="text-xs text-gray-500">
                            mov, mpg, mpeg, mp4, wmv, avi, webm up to 500MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t-2 border-white">
          <div className="max-w-7xl mx-auto sm:px-6 lg:p/x-8">
            <div className="px-4 py-6 sm:px-0 ">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-2">
                  <p className="text-1xl leading-6 text-indigo-500 font-semibold uppercase mb-4">
                    Step 2
                  </p>
                  <h3 className="text-lg font-medium leading-6 text-indigo-900">
                    Set destination email
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 max-w-sm">
                    Is only used to send you a temporary download link of the new video when the
                    process ends, since it takes several minutes.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-3 sm:col-span-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="myname@gmail.com"
                        />
                        <label htmlFor="email" className="mt-4 block text-xs text-gray-400">
                          This email is not saved anywhere. We won’t send you any emails other than
                          the link to download the new video from our servers in AWS. For further
                          details, review our Privacy Policy.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t-2 border-white">
          <div className="max-w-7xl mx-auto sm:px-6 lg:p/x-8">
            <div className="px-4 py-6 sm:px-0 ">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-2">
                  <p className="text-1xl leading-6 text-indigo-500 font-semibold uppercase mb-4">
                    Step 3
                  </p>
                  <h3 className="text-lg font-medium leading-6 text-indigo-900">Secure payment</h3>
                  <p className="mt-1 text-sm text-gray-600 max-w-sm">
                    Only after payment, the video is sent to the servers to be processed with the
                    help of artificial intelligence. When the process ends, the new video is sent to
                    the indicated email, and all the information used during the process is deleted.
                  </p>
                </div>
                <Stripe />
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

export default Setps;
