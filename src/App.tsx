import React, { useRef } from 'react';
import { useModal } from './hooks/useModal';
import Header from './containers/Header';
import Content from './containers/Content';
import Steps from './containers/Steps';
import Footer from './containers/Footer';
import Legal from './containers/Legal';

const App: React.FC = () => {
  const [isModal, openModal, closeModal] = useModal();
  const startRef = useRef<HTMLInputElement>(null);
  const scrollToStart = () => {
    startRef.current && startRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main>
        <Content scroll={scrollToStart} />
        <Steps startRef={startRef} clickLegal={openModal} />
      </main>
      {isModal && <Legal fn={closeModal} />}
      <Footer fn={openModal} />
    </>
  );
};

export default App;
