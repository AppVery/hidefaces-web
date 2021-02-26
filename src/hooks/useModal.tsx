import { useState } from 'react';

type Response = [boolean, () => void, () => void];

export const useModal = (): Response => {
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

  return [isModal, openModal, closeModal];
};
