import React, { useRef, useState, useEffect } from 'react';

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') < 0;
};

const Video: React.FC<{ image: string; video: string }> = ({ image, video }) => {
  const videoParentRef = useRef<HTMLHeadingElement>(null);
  const [shouldUseImage, setShouldUseImage] = useState(true);
  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0] as HTMLVideoElement;

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
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
                return;
              })
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                if (videoParentRef.current) {
                  videoParentRef.current.style.display = 'none';
                }
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);

  const styles =
    'mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6';

  return shouldUseImage ? (
    <img
      src={image}
      alt="Muted Video"
      className={styles}
      onClick={() => setShouldUseImage(false)}
    />
  ) : (
    <div
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
          className="${styles}"
        >
        <source src="${video}" type="video/mp4" />
        </video>`,
      }}
    />
  );
};

export default Video;
