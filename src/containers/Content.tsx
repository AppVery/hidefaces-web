import React from 'react';
import CtaBlock from '../components/CtaBlock';
import Video from '../components/Video';
import IconList from '../components/IconList';
import ImageMosaic from '../components/ImageMosaic';
import { mainContent } from '../content/main';

const { button, mainCta, secondaryCta } = mainContent;
const mainVideo = '/videos/video.mp4';
const mainImage = '/videos/frame.jpg';

const Content: React.FC<{ scrollTo: () => void }> = ({ scrollTo }) => {
  const sectionClass = 'max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 lg:text-center';

  return (
    <>
      <section className={sectionClass}>
        <header>
          <CtaBlock isMain={true} data={{ ...mainCta, button, fn: scrollTo }} />
        </header>
        <div className="my-10 md:my-20 mx-2 cursor-pointer">
          <Video image={mainImage} video={mainVideo} />
        </div>
      </section>
      <section className={sectionClass}>
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
            <header>
              <CtaBlock data={{ ...secondaryCta, button, fn: scrollTo }} />
            </header>
            <IconList />
          </div>
          <aside className="mt-14 lg:-mx-4 lg:mt-0 lg:col-start-1">
            <div className="space-y-6">
              <ImageMosaic />
            </div>
          </aside>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="mt-8">
          <a
            href="https://www.producthunt.com/posts/hidefaces?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hidefaces"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mx-auto"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=287940&theme=dark"
              alt="HideFaces - Automatically hide faces in videos with AI | Product Hunt"
              style={{ width: '250', height: '54' }}
              width="250"
              height="54"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default Content;
