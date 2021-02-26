import React from 'react';
import { useShowVideo } from '../hooks/useShowVideo';
import playIcon from '../svg/play.svg';

const Video: React.FC<{ image: string; video: string }> = ({ image, video }) => {
  const [videoRef, isVideo, showVideo] = useShowVideo();

  const styles =
    'flex justify-center mx-auto w-full md:w-4/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6 animate max-w-lg';
  const border = 'bg-indigo-800 p-1 shadow-2xl';

  return isVideo ? (
    <div
      className={styles}
      ref={videoRef}
      onClick={() => showVideo(false)}
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
  ) : (
    <div className="relative">
      <img
        src={image}
        alt="Muted Video with hide faces"
        className={`${styles} ${border}`}
        onClick={() => showVideo()}
      />
      <div className="play absolute left-2/4 top-2/4 rounded-full p-1 bg-indigo-800 animate-bounce">
        <img className="h-10 w-10" src={playIcon} alt="play" onClick={() => showVideo()} />
      </div>
    </div>
  );
};

export default Video;
