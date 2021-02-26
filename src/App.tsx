import React from 'react';
import Header from './containers/Header';
import Content from './containers/Content';
import Steps from './containers/Steps';
import Footer from './containers/Footer';
import Legal from './containers/Legal';
import { useModal } from './hooks/useModal';
import { useScrollTo } from './hooks/useScrollTo';

const App: React.FC = () => {
  const [isLegalModal, openLegalModal, closeLegalModal] = useModal();
  const [startRef, scrollToStart] = useScrollTo();

  return (
    <>
      <Header />
      <main>
        <Content scrollTo={scrollToStart} />
        <Steps scrollRef={startRef} fn={openLegalModal} />
      </main>
      {isLegalModal && <Legal fn={closeLegalModal} />}
      <Footer fn={openLegalModal} />
    </>
  );
};

export default App;
