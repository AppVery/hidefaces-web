import React, { useState } from 'react';
import Modal from './Modal';
import Step from '../components/Step';
import File from '../components/File';
import Email from '../components/Email';
import Stripe from '../components/Stripe';
import { stepsContent } from '../content/steps';

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [isModal, showModal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);
  const [file, setFile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [modalData, setModalData] = useState<{
    error: boolean;
    title: string;
    text: string;
    loading?: boolean;
  }>({
    error: true,
    title: 'Error',
    text: 'Check steps errors',
    loading: false,
  });

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

  const handlePay = (token: stripe.Token | undefined) => {
    console.log('submit');
    console.log(token, email, file);
    if (file && email && token) {
      setModalData({
        error: false,
        title: 'Correct data on all steps',
        text: 'Processing the payment',
        loading: true,
      });
      setTimeout(() => {
        setModalData({
          error: false,
          title: 'Satisfactory payment',
          text: 'Starting the video upload',
          loading: true,
        });
        setTimeout(() => {
          setModalData({
            error: false,
            title: 'Video uploaded successfully',
            text: `Start of video processing: In less than half an hour you will receive it in your email: ${email}`,
            loading: false,
          });
        }, 4000);
      }, 4000);
    } else {
      const title = [];
      const text = [];
      if (!file) {
        title.push('Step 1');
        text.push('video');
      }
      if (!email) {
        title.push('Step 2');
        text.push('email');
      }
      if (!token) {
        title.push('Step 3');
        text.push('credit card');
      }
      setModalData({
        error: true,
        title: `Error on: ${title.join(', ')}`,
        text: `Please check your: ${text.join(', ')}`,
      });
    }
    openModal();
  };

  return (
    <section ref={startRef} className="bg-gray-200 py-2 mt-10">
      {isModal && <Modal data={modalData} fn={closeModal} />}
      <form>
        <Step content={stepsContent[0]} border={false}>
          <File setFile={setFile} />
        </Step>
        <Step content={stepsContent[1]}>
          <Email setEmail={setEmail} />
        </Step>
        <Step content={stepsContent[2]}>
          <Stripe email={email} handlePay={handlePay} />
        </Step>
      </form>
    </section>
  );
};

export default Setps;
