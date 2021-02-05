import React from 'react';

const data = ['blur-image', 'computer', 'eye', 'camera'];

const ImageMosaic: React.FC = () => {
  return (
    <>
      <div className="flex items-end justify-center lg:justify-start space-x-4">
        <img
          className="rounded-lg shadow-lg w-32 md:w-56"
          width="200"
          src={`/images/${data[0]}.jpg`}
          alt={data[0]}
        />
        <img
          className="rounded-lg shadow-lg w-40 md:w-64"
          width="260"
          src={`/images/${data[1]}.jpg`}
          alt={data[1]}
        />
      </div>
      <div className="flex items-start justify-center lg:justify-start space-x-4 ml-12">
        <img
          className="rounded-lg shadow-lg w-24 md:w-40"
          width="170"
          src={`/images/${data[2]}.jpg`}
          alt={data[2]}
        />
        <img
          className="rounded-lg shadow-lg w-32 md:w-56"
          width="200"
          src={`/images/${data[3]}.jpg`}
          alt={data[3]}
        />
      </div>
    </>
  );
};

export default ImageMosaic;
