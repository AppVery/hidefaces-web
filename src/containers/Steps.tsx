import React, { useState } from 'react';
import Step from '../components/Step';
import File from '../components/File';
import Email from '../components/Email';
import Stripe from '../components/Stripe';

const data = [
  {
    title: 'Step 1',
    subtitle: 'Choose your video',
    description:
      'You can upload a video with a maximum length of 60 seconds, which will be deleted at the end of the process.',
  },
  {
    title: 'Step 2',
    subtitle: 'Set destination email',
    description:
      'Is only used to send you a temporary download link of the new video when the process ends, since it takes several minutes.',
  },
  {
    title: 'Step 3',
    subtitle: 'Secure payment',
    description:
      'Only after payment, the video is sent to the servers to be processed with the help of artificial intelligence. When the process ends, the new video is sent to the indicated email, and all the information used during the process is deleted.',
  },
];

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [isModal, showModal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);

  const openModal = () => {
    const offset = window.scrollY;
    setWindowOffset(offset);
    document.body.setAttribute('style', `position: fixed; top: -${offset}px; left:0: right; 0;`);
    showModal(true);
  };
  const closeModal = () => {
    document.body.setAttribute('style', '');
    window.scrollTo(0, windowOffset);
    showModal(false);
  };

  return (
    <section ref={startRef} className="bg-gray-200 py-2 mt-10">
      <form action="#">
        <Step content={data[0]} border={false}>
          <File />
        </Step>
        <Step content={data[1]}>
          <Email />
        </Step>
        <Step content={data[2]}>
          <Stripe />
        </Step>
      </form>
    </section>
  );
};

export default Setps;
