import { useState } from 'react';
import config from '../config';
import { Token } from '@stripe/stripe-js';
import axios from 'axios';

type ModalData = {
  error: boolean;
  title: string;
  html: string;
  loading?: boolean;
};

type Data = {
  modalData: ModalData;
  email: string;
  file: File | null;
};

type Handlers = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handlePay: (token: Token | undefined, quantity: number) => void;
};

type Response = [Data, Handlers];

export const useSteps = (openNoticesModal: () => void): Response => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [modalData, setModalData] = useState<ModalData>({
    error: true,
    title: 'Error',
    html: 'Check step error',
    loading: false,
  });

  const getTempUploadUrl = async (token: string, quantity: number) => {
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

  const handlePay = async (token: Token | undefined, quantity: number) => {
    console.log('handlePay', token, quantity);
    if (file && email && token) {
      setModalData({
        error: false,
        title: 'Correct data on all steps',
        html: 'Process payment',
        loading: true,
      });
      openNoticesModal();
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
      openNoticesModal();
    }
  };

  const data = {
    modalData,
    email,
    file,
  };

  const handlers = {
    setFile,
    setEmail,
    handlePay,
  };

  return [data, handlers];
};
