import { useState, useReducer, useMemo } from 'react';
import { stepsReducer, Types } from './stepsReducer';
import config from '../config';
import axios from 'axios';
import { ModalData } from '../containers/Modal';
import { loadStripe } from '@stripe/stripe-js';

type Data = {
  modalData: ModalData;
  email: string;
  file: File | null;
};

type Handlers = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handlePay: (amount: number) => void;
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
  const stripePromise = useMemo(() => loadStripe(config.STRIPE_KEY), [config.STRIPE_KEY]);

  const getTempUploadUrl = async (
    amount: number,
  ): Promise<{ id: string | null; url: string | null }> => {
    try {
      const response = await axios.post(config.endpoint, {
        email,
        filename: file?.name,
        amount,
        origin: window.location.origin,
      });

      console.log('session', response);

      if (200 !== response.status) {
        throw Error();
      }

      dispatchModalData({ type: Types.okSession });
      const { id, url } = response.data.response;
      return { id, url };
    } catch (error) {
      dispatchModalData({ type: Types.errorFinal });
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
      dispatchModalData({ type: Types.errorFinal });
    }
  };

  const checkData = (): boolean => {
    const stepsWithError = [];

    if (!file) {
      stepsWithError.push(1);
    }
    if (!email) {
      stepsWithError.push(2);
    }

    if (file && email) {
      dispatchModalData({ type: Types.okData });
      return true;
    } else {
      dispatchModalData({ type: Types.errorData, stepsWithError });
      return false;
    }
  };

  const handlePay = async (amount: number) => {
    const isOkData = checkData();
    openNoticesModal();

    if (isOkData) {
      const stripe = await stripePromise;

      if (!stripe) {
        throw Error();
      }

      const { id, url } = await getTempUploadUrl(amount);

      if (id && url) {
        await uploadVideo(id, url);

        await stripe.redirectToCheckout({
          sessionId: id,
        });
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
