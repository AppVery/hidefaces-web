import React, { useRef, useState, useEffect } from 'react';

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') < 0;
};

const Video: React.FC<{ image: string; video: string }> = ({ image, video }) => {
  const videoParentRef = useRef<HTMLHeadingElement>(null);
  const [shouldUseImage, setShouldUseImage] = useState(true);
  useEffect(() => {
    if (isSafari() && videoParentRef.current) {
      const player = videoParentRef.current.children[0] as HTMLVideoElement;

      if (player) {
        player.controls = false;
        player.playsInline = true;
        player.muted = true;
        player.setAttribute('muted', ''); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {
                setShouldUseImage(false);
              })
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                if (videoParentRef.current) {
                  videoParentRef.current.style.display = 'none';
                }
                setShouldUseImage(true);
              });
          }
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setShouldUseImage(false);
      }, 3000);
    }
  }, []);

  const styles =
    'flex justify-center mx-auto w-full md:w-4/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6 animate max-w-lg';
  const border = 'bg-indigo-800 p-1 shadow-2xl';

  return shouldUseImage ? (
    <img
      src={image}
      alt="Muted Video with hide faces"
      className={`${styles} ${border}`}
      onClick={() => setShouldUseImage(false)}
    />
  ) : (
    <div
      className={styles}
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
          class="${border}"
        >
        <source src="${video}" type="video/mp4"/>
        </video>`,
      }}
    />
  );
};

export default Video;
