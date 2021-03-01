import { useState, useReducer } from 'react';
import { stepsReducer, Types } from './stepsReducer';
import config from '../config';
import { Token } from '@stripe/stripe-js';
import axios from 'axios';
import { ModalData } from '../containers/Modal';

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
  const [modalData, dispatchModalData] = useReducer(stepsReducer, {
    title: 'Error',
    html: 'Check step error',
    error: true,
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
        dispatchModalData({ type: Types.okPayment });
        const { id, url } = result.data.response;

        return { id, url };
      } else {
        throw Error();
      }
    } catch (error) {
      dispatchModalData({ type: Types.errorPayment });
      return { id: null, url: null };
    }
  };

  const uploadVideo = async (id: string, tempUploadUrl: string) => {
    console.log('uploading...', id, tempUploadUrl);
    try {
      const response = await axios.put(tempUploadUrl, file);

      console.log('axios response', response);
      if (200 === response.status) {
        dispatchModalData({ type: Types.okFinal, id, email });
        //setFile(null);
        //setEmail('');
      } else {
        throw Error();
      }
    } catch (error) {
      dispatchModalData({ type: Types.errorFinal, id });
    }
  };

  const handlePay = async (token: Token | undefined, quantity: number) => {
    console.log('handlePay', token, quantity);
    if (file && email && token) {
      dispatchModalData({ type: Types.okData });
      openNoticesModal();
      const { id, url } = await getTempUploadUrl(token.id, quantity);
      if (id && url) {
        await uploadVideo(id, url);
      }
    } else {
      const stepsWithError = [];
      if (!file) {
        stepsWithError.push(1);
      }
      if (!email) {
        stepsWithError.push(2);
      }
      if (!token) {
        stepsWithError.push(3);
      }
      dispatchModalData({ type: Types.errorData, stepsWithError });
      openNoticesModal();
    }
  };

  return [
    {
      modalData,
      email,
      file,
    },
    {
      setFile,
      setEmail,
      handlePay,
    },
  ];
};
