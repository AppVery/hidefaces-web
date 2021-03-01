import { useState } from 'react';
import { fileContent } from '../content/steps';
import config from '../config';

const { validVideoTypes } = fileContent;

type Response = [boolean, boolean, (files: File[]) => void];

const loadVideo = (file: File): Promise<HTMLVideoElement> =>
  new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = function () {
        resolve(this as HTMLVideoElement);
      };

      video.onerror = function () {
        reject('Invalid video. Please select a video file.');
      };

      video.src = window.URL.createObjectURL(file);
    } catch (e) {
      reject(e);
    }
  });

export const useCheckVideo = (fn: React.Dispatch<React.SetStateAction<File | null>>): Response => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isOkVideo, setIsOkVideo] = useState<boolean>(false);

  const setError = () => {
    fn(null);
    setIsError(true);
    setIsOkVideo(false);
  };

  const setOkVideo = (file: File) => {
    fn(file);
    setIsError(false);
    setIsOkVideo(true);
  };

  const checkVideo = async (files: File[]) => {
    if (!files || files.length === 0) {
      setError();
    }

    try {
      const file = files[0];
      const video: HTMLVideoElement = await loadVideo(file);
      const duration: number = video.duration ?? 100;
      const extension = file.name.replace(/^.*\./, '');
      const megabytes = Math.round(file.size / 1024 / 1024);

      if (
        validVideoTypes.includes(extension) &&
        duration <= config.MAX_SECONDS + 1 &&
        megabytes <= config.MAX_MEGABYTES + 1
      ) {
        setOkVideo(file);
      } else {
        setError();
      }
    } catch (error) {
      setError();
    }
  };

  return [isOkVideo, isError, checkVideo];
};
