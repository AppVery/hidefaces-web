import React, { useState } from 'react';
import Step from '../components/Step';
import File from '../components/File';
import Email from '../components/Email';
import Stripe from '../components/Stripe';
import { stepsContent } from '../content/steps';

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [file, setFile] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent) => {
    console.log('submit', e);
    e.preventDefault();
  };

  return (
    <section ref={startRef} className="bg-gray-200 py-2 mt-10">
      <form onSubmit={handleSubmit}>
        <Step content={stepsContent[0]} border={false}>
          <File setFile={setFile} />
        </Step>
        <Step content={stepsContent[1]}>
          <Email setEmail={setEmail} email={email} />
        </Step>
        <Step content={stepsContent[2]}>
          <Stripe />
        </Step>
      </form>
    </section>
  );
};

export default Setps;
