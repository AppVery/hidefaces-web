import { useRef, useState } from 'react';

type Response = [React.RefObject<HTMLDivElement>, boolean, (show?: boolean) => void];

const isSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') < 0;
};

const handleInSafari = (
  videoRef: React.RefObject<HTMLDivElement>,
  setVideo: (show: boolean) => void,
) => {
  const player = videoRef.current?.children[0] as HTMLVideoElement;

  if (!player) {
    return;
  }

  player.controls = false;
  player.playsInline = true;
  player.muted = true;
  player.setAttribute('muted', '');
  player.autoplay = true;

  setTimeout(() => {
    const promise = player.play();
    if (promise.then) {
      promise
        .then(() => {
          setVideo(true);
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.style.display = 'none';
          }
          setVideo(false);
        });
    }
  }, 0);
};

export const useShowVideo = (): Response => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVideo, setVideo] = useState(false);

  const showVideo = (show = true) => {
    if (!show) {
      setVideo(false);
      return;
    }

    if (isSafari() && videoRef.current) {
      handleInSafari(videoRef, setVideo);
    } else {
      setVideo(true);
    }
  };

  return [videoRef, isVideo, showVideo];
};
