import { useRef } from 'react';

type Response = [React.RefObject<HTMLElement>, () => void];

export const useScrollTo = (): Response => {
  const scrollRef = useRef<HTMLElement>(null);
  const scrollTo = () => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return [scrollRef, scrollTo];
};
