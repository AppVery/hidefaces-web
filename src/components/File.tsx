import React, { useCallback } from 'react';
import { useCheckVideo } from '../hooks/useCheckVideo';
import { useDropzone } from 'react-dropzone';
import { fileContent } from '../content/steps';
import checkIcon from '../svg/check.svg';
import warnIcon from '../svg/warn.svg';
import addIcon from '../svg/add.svg';

const { text1, text2, text3, dropText, error } = fileContent;

const File: React.FC<{
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}> = ({ setFile }) => {
  const [isOkFile, isError, checkVideo] = useCheckVideo(setFile);
  const onDrop = useCallback(async (files) => {
    checkVideo(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
    >
      <div className="space-y-1 text-center cursor-pointer">
        <label className={`mb-2 block text-ms text-${isError ? 'red' : 'green'}-400`}>
          {isDragActive ? dropText : isError ? error : ''}
        </label>

        <span className="flex-shrink-0 flex items-center justify-center">
          {isOkFile ? (
            <img className="h-16 w-16" src={checkIcon} alt="Video file ready" />
          ) : (
            <img className="h-10 w-10" src={isError ? warnIcon : addIcon} alt="Add video file" />
          )}
        </span>

        <input
          {...getInputProps()}
          id="file-upload"
          name="file-upload"
          type="file"
          className="relative sr-only"
        />
        <p className="cursor-pointer bg-white rounded-md font-medium text-indigo-600">{text1}</p>
        <p className="text-xs font-medium">{text2}</p>
        <p className="text-xs text-gray-500">{text3}</p>
      </div>
    </div>
  );
};

export default File;
