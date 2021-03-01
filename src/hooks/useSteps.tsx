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

  const getTempUploadUrl = async (
    token: string,
    quantity: number,
  ): Promise<{ id: string | null; url: string | null }> => {
    try {
      const response = await axios.post(config.endpoint, {
        email,
        token,
        filename: file?.name,
        quantity,
      });

      if (200 !== response.status) {
        throw Error();
      }

      dispatchModalData({ type: Types.okPayment });
      const { id, url } = response.data.response;
      return { id, url };
    } catch (error) {
      dispatchModalData({ type: Types.errorPayment });
      return { id: null, url: null };
    }
  };

  const uploadVideo = async (id: string, tempUploadUrl: string): Promise<void> => {
    try {
      const response = await axios.put(tempUploadUrl, file);

      if (200 !== response.status) {
        throw Error();
      }

      dispatchModalData({ type: Types.okFinal, id, email });
    } catch (error) {
      dispatchModalData({ type: Types.errorFinal, id });
    }
  };

  const checkData = (token: Token | undefined): boolean => {
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

    if (file && email && token) {
      dispatchModalData({ type: Types.okData });
      return true;
    } else {
      dispatchModalData({ type: Types.errorData, stepsWithError });
      return false;
    }
  };

  const handlePay = async (token: Token | undefined, quantity: number) => {
    const isOkData = checkData(token);
    openNoticesModal();

    if (token && isOkData) {
      const { id, url } = await getTempUploadUrl(token.id, quantity);
      if (id && url) {
        await uploadVideo(id, url);
      }
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
