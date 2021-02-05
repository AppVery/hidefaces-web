import React from 'react';

const Bar: React.FC = () => {
  return (
    <div>
      <div className="bg-white rounded-lg w-72 shadow block p-4 m-auto">
        <div>
          <span className="text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white bg-yellow-400">
            Task in progress
          </span>
        </div>
        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
          <div className="w-3/4 h-full text-center text-xs text-white bg-indigo-600 rounded-full">
            75%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
