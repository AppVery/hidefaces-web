import React, { useState } from 'react';
import { useModal } from '../hooks/useModal';
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

const Setps: React.FC<{
  startRef: React.RefObject<HTMLInputElement>;
  clickLegal: () => void;
}> = ({ startRef, clickLegal }) => {
  const [isModal, openModal, closeModal] = useModal();
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [modalData, setModalData] = useState<{
    error: boolean;
    title: string;
    html: string;
    loading?: boolean;
  }>({
    error: true,
    title: 'Error',
    html: 'Check step error',
    loading: false,
  });

  const getTempUploadUrl = async (token: string, quantity: string) => {
    try {
      const result = await axios.post(config.endpoint, {
        email,
        token,
        filename: file?.name,
        quantity,
      });
      console.log('url', result);
      if (200 === result.status) {
        setModalData({
          error: false,
          title: 'Satisfactory payment',
          html: 'Start video upload',
          loading: true,
        });
        const { id, url } = result.data.response;

        return { id, url };
      } else {
        throw Error();
      }
    } catch (error) {
      setModalData({
        error: true,
        title: 'Error with the payment',
        html: `Please try again in a few minutes or contact <strong>info@hidefaces.app</strong>`,
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
          html: `The tracking code is: <strong>${id}</strong>. In less than 30 minutes, you will receive it via email: <strong>${email}</strong>.`,
          loading: false,
        });
        //setFile(null);
        //setEmail('');
      } else {
        throw Error();
      }
    } catch (error) {
      setModalData({
        error: true,
        title: 'Video error',
        html: `Please contact us via <strong>info@hidefaces.app</strong> to request a refund using code: <strong>${id}</strong>`,
        loading: false,
      });
    }
  };

  const handlePay = async (token: Token | undefined, quantity: string) => {
    console.log('handlePay', token, quantity);
    if (file && email && token) {
      setModalData({
        error: false,
        title: 'Correct data on all steps',
        html: 'Process payment',
        loading: true,
      });
      openModal();
      const { id, url } = await getTempUploadUrl(token.id, quantity);
      if (id && url) {
        await uploadVideo(id, url);
      }
    } else {
      const title = [];
      const text = [];
      if (!file) {
        title.push('Step 1');
        text.push('<li>video</li>');
      }
      if (!email) {
        title.push('Step 2');
        text.push('<li>email</li>');
      }
      if (!token) {
        title.push('Step 3');
        text.push('<li>credit card</li>');
      }
      setModalData({
        error: true,
        title: `Error on: ${title.join(', ')}`,
        html: `Please check your: <ul><strong>${text.join('')}</strong></ul>`,
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
          <Email setEmail={setEmail} clickLegal={clickLegal} />
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
