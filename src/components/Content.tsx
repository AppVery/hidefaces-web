import React from 'react';
import deleteIcon from '../svg/delete.svg';
import robotIcon from '../svg/robot.svg';
import monkeyIcon from '../svg/monkey.svg';
import pushIcon from '../svg/push.svg';
import mainImage from '../svg/sides.svg';

const Content: React.FC = () => {
  return (
    <section>
      <div className="w-full xl:w-3/5 p-12 overflow-hidden items-center">
        <img
          className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
          src={mainImage}
        />
      </div>
      <section className="bg-white">
        <div className="py-12 bg-white">
          <div className="max-w-screen-xl p-4 bg-white dark:bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:mt-20">
            <div className="relative">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
                  <p className="text-base leading-6 text-indigo-500 font-semibold uppercase">
                    new app that uses AI to quickly anonymize videos
                  </p>
                  <h4 className="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                    Are you ready to get started?
                  </h4>
                  <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                    Hidefaces.app uses Artificial Intelligence to identify people in videos and then
                    blur, pixelate, or block out entirely faces
                  </p>
                  <ul className="mt-8 md:grid md:grid-cols-2 gap-6">
                    <li className="mt-6 lg:mt-0">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-15 w-15 rounded-full bg-indigo-200 text-indigo-800 dark:text-green-500 drark:bg-transparent">
                          <img className="h-12 w-12" src={pushIcon} alt="Delete Image" />
                        </span>
                        <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                          Easy to use solution
                        </span>
                      </div>
                    </li>
                    <li className="mt-6 lg:mt-0">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-15 w-15 rounded-full bg-indigo-200 text-indigo-800 dark:text-green-500 drark:bg-transparent">
                          <img className="h-12 w-12" src={robotIcon} alt="Delete Image" />
                        </span>
                        <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                          Faster than human labor
                        </span>
                      </div>
                    </li>
                    <li className="mt-6 lg:mt-0">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-15 w-15 rounded-full bg-indigo-200 text-indigo-800 dark:text-green-500 drark:bg-transparent">
                          <img className="h-12 w-12" src={monkeyIcon} alt="Delete Image" />
                        </span>
                        <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                          Work without login
                        </span>
                      </div>
                    </li>
                    <li className="mt-6 lg:mt-0">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-15 w-15 rounded-full bg-indigo-200 text-indigo-800 dark:text-green-500 drark:bg-transparent">
                          <img className="h-12 w-12" src={deleteIcon} alt="Delete Image" />
                        </span>
                        <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                          The video is not saved
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
                  <div className="relative space-y-4">
                    <div className="flex items-end justify-center lg:justify-start space-x-4">
                      <img
                        className="rounded-lg shadow-lg w-32 md:w-56"
                        width="200"
                        src="/images/3.jpg"
                        alt="1"
                      />
                      <img
                        className="rounded-lg shadow-lg w-40 md:w-64"
                        width="260"
                        src="/images/2.jpg"
                        alt="2"
                      />
                    </div>
                    <div className="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                      <img
                        className="rounded-lg shadow-lg w-24 md:w-40"
                        width="170"
                        src="/images/1.jpg"
                        alt="3"
                      />
                      <img
                        className="rounded-lg shadow-lg w-32 md:w-56"
                        width="200"
                        src="/images/4.jpg"
                        alt="4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Content;
