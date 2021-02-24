import React, { useRef, useState } from 'react';
import playIcon from '../svg/play.svg';

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') < 0;
};

const Video: React.FC<{ image: string; video: string }> = ({ image, video }) => {
  const videoParentRef = useRef<HTMLHeadingElement>(null);
  const [shouldUseImage, setShouldUseImage] = useState(true);
  const showVideo = () => {
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
        }, 0);
      }
    } else {
      setShouldUseImage(false);
    }
  };

  const styles =
    'flex justify-center mx-auto w-full md:w-4/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6 animate max-w-lg';
  const border = 'bg-indigo-800 p-1 shadow-2xl';

  return shouldUseImage ? (
    <div className="relative">
      <img
        src={image}
        alt="Muted Video with hide faces"
        className={`${styles} ${border}`}
        onClick={showVideo}
      />
      <div className="play absolute left-2/4 top-2/4 rounded-full p-1 bg-indigo-800 animate-bounce">
        <img className="h-10 w-10" src={playIcon} alt="play" onClick={showVideo} />
      </div>
    </div>
  ) : (
    <div
      className={styles}
      ref={videoParentRef}
      onClick={() => setShouldUseImage(true)}
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
