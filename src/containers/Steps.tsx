import React, { useState } from 'react';
import Modal from './Modal';
import Step from '../components/Step';
import File from '../components/File';
import Email from '../components/Email';
import Stripe from '../components/Stripe';
import timerIcon from '../svg/timer.svg';
import { stepsContent, waitContent } from '../content/steps';
import config from '../config';
import { Token } from '@stripe/stripe-js';
import axios from 'axios';

const Setps: React.FC<{ startRef: React.RefObject<HTMLInputElement> }> = ({ startRef }) => {
  const [isModal, showModal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [modalData, setModalData] = useState<{
    error: boolean;
    title: string;
    text: string;
    loading?: boolean;
  }>({
    error: true,
    title: 'Error',
    text: 'Check step error',
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

  const getTempUploadUrl = async (token: string) => {
    try {
      const response = await axios.post(config.endpoint, { email, token });

      if (200 === response.status) {
        setModalData({
          error: false,
          title: 'Satisfactory payment',
          text: 'Start video upload',
          loading: true,
        });
        const { id, url } = response.data;

        return { id, url };
      } else {
        throw Error();
      }
    } catch (error) {
      setModalData({
        error: true,
        title: 'Error with the payment',
        text: `Please try again in a few minutes or contact info@hidefaces.app`,
        loading: false,
      });
      return { id: null, url: null };
    }
  };

  const uploadVideo = async (id: string, tempUploadUrl: string) => {
    console.log('uploading...', id, tempUploadUrl);
    try {
      const response = await axios.put(tempUploadUrl, file);

      console.log('axios response', response);
      if (200 === response.status) {
        setModalData({
          error: false,
          title: 'Start video processing',
          text: `In less than half an hour, you will receive it via email info@es.es: ${email}`,
          loading: false,
        });
      } else {
        throw Error();
      }
    } catch (error) {
      setModalData({
        error: true,
        title: 'Video error',
        text: `Please contact us via info@hidefaces.app to request a refund using code: ${id}`,
        loading: false,
      });
    }
  };

  const handlePay = async (token: Token | undefined) => {
    console.log('handlePay', token);
    if (file && email && token) {
      setModalData({
        error: false,
        title: 'Correct data on all steps',
        text: 'Process payment',
        loading: true,
      });
      openModal();
      const { id, url } = await getTempUploadUrl(token.id);
      if (id && url) {
        await uploadVideo(id, url);
      }
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
      openModal();
    }
  };

  return (
    <section ref={startRef} className="bg-gray-200 py-2 mt-10">
      {isModal && <Modal data={modalData} fn={closeModal} />}
      <form>
        <Step content={stepsContent[0]} topBorder={false} ready={!!file}>
          <File setFile={setFile} />
        </Step>
        <Step content={stepsContent[1]} ready={!!email}>
          <Email setEmail={setEmail} />
        </Step>
        <Step content={stepsContent[2]}>
          <Stripe email={email} handlePay={handlePay} />
        </Step>
        <Step content={stepsContent[3]}>
          <div className="flex items-center">
            <img className="h-12 w-12" src={timerIcon} alt="Timer Icon" />
            <span className="ml-4 text-base leading-6 font-medium text-gray-500">
              {waitContent.text}
            </span>
          </div>
        </Step>
      </form>
    </section>
  );
};

export default Setps;
