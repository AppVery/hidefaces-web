import React, { useState } from 'react';
import { fileContent } from '../content/steps';
import videoIcon from '../svg/video.svg';
import addIcon from '../svg/add.svg';

const { text1, text2, text3 } = fileContent;
const error = 'Please enter valid video file';
const validVideoTypes = ['mp4', 'mkv'];

const File: React.FC<{
  setFile: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFile }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isOkFile, setIsOkFile] = useState<boolean>(false);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const { name, size, type } = files[0];
      const videoData = {
        name,
        extension: name.replace(/^.*\./, ''),
        megabytes: Math.round(size / 1024 / 1024),
        type,
      };
      console.log(videoData);

      if (validVideoTypes.includes(videoData.extension) && videoData.megabytes < 500) {
        setFile(name);
        setIsOkFile(true);
      } else {
        setFile('');
        setIsError(true);
      }
    } else {
      setFile('');
      setIsError(true);
    }
  };
  return (
    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center cursor-pointer">
        {isError && <label className="mb-2 block text-ms text-red-400">{error}</label>}
        {!isOkFile ? (
          <span className="flex-shrink-0 flex items-center justify-center">
            <img className="h-10 w-10" src={addIcon} alt="Add video file" />
          </span>
        ) : (
          <span className="flex-shrink-0 flex items-center justify-center">
            <img className="h-16 w-16" src={videoIcon} alt="Video file ready" />
          </span>
        )}
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>{text1}</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onChange}
            />
          </label>
          <p className="pl-1">{text2}</p>
        </div>
        <p className="text-xs text-gray-500">{text3}</p>
      </div>
    </div>
  );
};

export default File;
