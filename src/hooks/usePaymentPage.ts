import { useState, useEffect } from 'react';
import { ModalData } from '../containers/Modal';

type Response = [ModalData];

export const usePaymentPage = (openPaymentModal: () => void): Response => {
  const path = window.location.pathname;
  const [paymentData, setPaymentData] = useState({
    title: '',
    html: '',
    error: false,
    close: true,
  });

  useEffect(() => {
    if ('/success' === path) {
      setPaymentData({
        ...paymentData,
        title: 'Satisfactory payment',
        html:
          'Starting video processing. In less than 30 minutes, you will receive download link via email.',
      });
      openPaymentModal();
    }

    if ('/cancel' === path) {
      setPaymentData({
        ...paymentData,
        title: 'Error on payment',
        html: 'Please try again',
        error: true,
      });
      openPaymentModal();
    }
  }, [path]);

  return [paymentData];
};
